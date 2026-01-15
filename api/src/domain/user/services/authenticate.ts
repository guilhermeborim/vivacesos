import { compare } from "bcrypt";
import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { RefreshTokenRepository } from "../../../infra/database/typeorm/sass/repositories/refresh-token.repository";
import { UserTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/user.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { JWTService } from "../../../shared/services/jwt.service";
import { AuthLoginRequest } from "../interfaces/authLoginRequest";

export class AuthenticateService {
  private authRepository: UserTypeormRepository;
  private clinicUserRepository: ClinicUsersTypeormRepository;
  private refreshTokenRepository: RefreshTokenRepository;
  private jwtService: JWTService;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.jwtService = new JWTService();
  }

  async execute({ email, password }: AuthLoginRequest) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthenticatedError("A senha está inválida!");
    }

    const userBindedClinic =
      await this.clinicUserRepository.findUserBindedAnyClinics(user.id);

    await this.refreshTokenRepository.revokeByUserId(user.id);

    const { accessToken, refreshToken } = this.jwtService.generateTokenPair({
      id: user.id,
      email: user.email,
      clinicId:
        userBindedClinic.length === 1 ? userBindedClinic[0].clinicId : null,
    });

    await this.refreshTokenRepository.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: this.jwtService.getRefreshTokenExpiryDate(),
    });

    delete user.password;

    return {
      token: accessToken,
      refreshToken,
      user,
    };
  }
}

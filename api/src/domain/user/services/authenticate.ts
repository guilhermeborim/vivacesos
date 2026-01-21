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
  private refreshTokenRepository: RefreshTokenRepository;
  private jwtService: JWTService;
  private clinicsUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.jwtService = new JWTService();
    this.clinicsUserRepository = new ClinicUsersTypeormRepository();
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

    const clinics = await this.clinicsUserRepository.findUserBindedAnyClinics(
      user.id,
    );

    await this.refreshTokenRepository.revokeByUserId(user.id);

    const { accessToken, refreshToken } = this.jwtService.generateTokenPair({
      id: user.id,
      email: user.email,
      clinicId:
        clinics.length > 1
          ? null
          : clinics.length === 1
            ? clinics[0].clinicId
            : null,
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
    };
  }
}

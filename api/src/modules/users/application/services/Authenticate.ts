import { compare } from "bcrypt";
import { NotFoundError } from "../../../../shared/errors/not-found.error";
import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error";
import { JWTService } from "../../../../shared/services/jwt.service";
import { ClinicUsersTypeormRepository } from "../../../clinicUser/database/repositories/ClinicUserTypeormRepository";
import { RefreshTokenRepositoryInterface } from "../../../refreshToken/database/interface/RefreshTokenTypeormInterface";
import { RefreshTokenRepository } from "../../../refreshToken/database/repositories/RefreshTokenTypeormRepository";
import { UserTypeormRepository } from "../../database/repositories/UserTypeormRepository";
import { UserLoginParams } from "../types";

export class AuthenticateService {
  private authRepository: UserTypeormRepository;
  private refreshTokenRepository: RefreshTokenRepositoryInterface;
  private jwtService: JWTService;
  private clinicsUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.jwtService = new JWTService();
    this.clinicsUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute({ email, password }: UserLoginParams) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthenticatedError("A senha está inválida!");
    }

    const clinics = await this.clinicsUserRepository.getClinicsByUser(user.id);

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
      clinicId:
        clinics.length > 1
          ? null
          : clinics.length === 1
            ? clinics[0].clinicId
            : null,
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

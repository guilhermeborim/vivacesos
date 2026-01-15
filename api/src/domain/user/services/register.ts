import { hashSync } from "bcrypt";
import { CreateUserParams } from "../../../infra/database/typeorm/sass/repositories/interfaces/user-repository.interface";
import { RefreshTokenRepository } from "../../../infra/database/typeorm/sass/repositories/refresh-token.repository";
import { UserTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/user.repository";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { JWTService } from "../../../shared/services/jwt.service";
import { AuthReponse } from "../interfaces/authResponse";

export class RegisterService {
  private authRepository: UserTypeormRepository;
  private refreshTokenRepository: RefreshTokenRepository;
  private jwtService: JWTService;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.jwtService = new JWTService();
  }

  async execute(user: CreateUserParams): Promise<AuthReponse> {
    const userExists = await this.authRepository.findByEmail(user.email);

    if (userExists) {
      throw new UnauthenticatedError("E-mail já está cadastrado!");
    }

    const encryptedPassword = hashSync(user.password, 10);

    const userCreated = await this.authRepository.createUser({
      ...user,
      password: encryptedPassword,
    });

    const { accessToken, refreshToken } = this.jwtService.generateTokenPair({
      id: userCreated.id,
      email: userCreated.email,
    });

    await this.refreshTokenRepository.create({
      token: refreshToken,
      userId: userCreated.id,
      expiresAt: this.jwtService.getRefreshTokenExpiryDate(),
    });

    delete userCreated.password;

    return {
      token: accessToken,
      refreshToken,
      user: userCreated,
    };
  }
}

import { RefreshTokenRepository } from "../../../infra/database/typeorm/sass/repositories/refresh-token.repository";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { JWTService } from "../../../shared/services/jwt.service";

export class RefreshTokenService {
  private refreshTokenRepository: RefreshTokenRepository;
  private jwtService: JWTService;

  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.jwtService = new JWTService();
  }

  async execute(refreshToken: string) {
    const storedToken =
      await this.refreshTokenRepository.findByToken(refreshToken);

    if (!storedToken || storedToken.isRevoked) {
      throw new UnauthenticatedError("Token inválido!");
    }

    if (!this.jwtService.isRefreshTokenValid(storedToken.expiresAt)) {
      await this.refreshTokenRepository.deleteExpired();
      throw new UnauthenticatedError("Token expirado!");
    }

    const accessToken = this.jwtService.generateAccessToken({
      id: storedToken.userId,
      email: storedToken.user.email,
      clinicId: storedToken.clinicId,
    });

    return { accessToken };
  }
}

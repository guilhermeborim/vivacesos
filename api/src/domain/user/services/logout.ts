import { RefreshTokenRepository } from "../../../infra/database/typeorm/sass/repositories/refresh-token.repository";

export class LogoutService {
  private refreshTokenRepository: RefreshTokenRepository;

  constructor() {
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  async execute(refreshToken: string) {
    if (refreshToken) {
      await this.refreshTokenRepository.deleteByRefreshToken(refreshToken);
    }

    return;
  }
}

import { RefreshTokenRepository } from "../../../refreshToken/database/repositories/RefreshTokenTypeormRepository";

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

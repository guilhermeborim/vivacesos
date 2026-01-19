import { FastifyReply, FastifyRequest } from "fastify";
import { RefreshTokenService } from "../../../../domain/user/services/refresh-token";

export class RefreshTokenController {
  private refreshTokenLogic: RefreshTokenService;

  constructor() {
    this.refreshTokenLogic = new RefreshTokenService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const refreshToken = request.cookies.refreshToken;
    if (typeof refreshToken !== "string" || !refreshToken) {
      return reply
        .status(400)
        .send({ error: "Refresh token está inválido ou ausente" });
    }

    const { accessToken } = await this.refreshTokenLogic.execute(refreshToken);

    reply.send({
      token: accessToken,
    });
  };
}

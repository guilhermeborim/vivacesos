import { FastifyReply, FastifyRequest } from "fastify";
import { LogoutService } from "../services/Logout";

export class LogoutController {
  private authLogic: LogoutService;

  constructor() {
    this.authLogic = new LogoutService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const refreshToken = request.cookies.refreshToken;

    if (refreshToken) {
      await this.authLogic.execute(refreshToken);
    }

    reply
      .clearCookie("refreshToken", {
        path: "/",
      })
      .clearCookie("token", {
        path: "/",
      })
      .status(200)
      .send();
  };
}

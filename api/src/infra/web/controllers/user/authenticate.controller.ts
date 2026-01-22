import { FastifyReply, FastifyRequest } from "fastify";
import { AuthLoginRequest } from "../../../../domain/user/interfaces/authLoginRequest";
import { AuthenticateService } from "../../../../domain/user/services/authenticate";
import { authenticateBodySchema } from "../../routes/schemas/user/authenticate.schema";

export class AuthenticateController {
  private authLogic: AuthenticateService;

  constructor() {
    this.authLogic = new AuthenticateService();
  }

  execute = async (
    request: FastifyRequest<{ Body: AuthLoginRequest }>,
    reply: FastifyReply,
  ) => {
    const userData = authenticateBodySchema.parse(request.body);

    const { refreshToken, ...user } = await this.authLogic.execute(userData);

    reply
      .setCookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        sameSite: process.env.NODE_ENV === "PROD" ? "none" : "lax",
        secure: process.env.NODE_ENV === "PROD" ? true : false,
      })
      .setCookie("token", user.token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 15, // 15 minutos
        sameSite: process.env.NODE_ENV === "PROD" ? "none" : "lax",
        secure: process.env.NODE_ENV === "PROD" ? true : false,
      })
      .send();
  };
}

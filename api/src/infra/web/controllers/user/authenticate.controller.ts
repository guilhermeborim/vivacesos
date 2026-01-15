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
    reply: FastifyReply
  ) => {
    const userData = authenticateBodySchema.parse(request.body);

    const user = await this.authLogic.execute(userData);

    reply.send(user);
  };
}

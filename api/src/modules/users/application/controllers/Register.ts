import { FastifyReply, FastifyRequest } from "fastify";
import { registerBodySchema } from "../../../../infra/web/routes/schemas/user/register.schema";
import { RegisterService } from "../services/Register";
import { UserCreateParams } from "../types";

export class RegisterController {
  private authLogic: RegisterService;

  constructor() {
    this.authLogic = new RegisterService();
  }

  execute = async (
    request: FastifyRequest<{ Body: UserCreateParams }>,
    reply: FastifyReply,
  ) => {
    const userData = registerBodySchema.parse(request.body);
    await this.authLogic.execute(userData);

    reply.status(201).send();
  };
}

import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterService } from "../../../../domain/user/services/register";
import { UserCreateParams } from "../../../database/typeorm/sass/interfaces/user";
import { registerBodySchema } from "../../routes/schemas/user/register.schema";

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

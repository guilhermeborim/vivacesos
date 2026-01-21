import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterService } from "../../../../domain/user/services/register";
import { CreateUserParams } from "../../../database/typeorm/sass/repositories/interfaces/user-repository.interface";
import { registerBodySchema } from "../../routes/schemas/user/register.schema";

export class RegisterController {
  private authLogic: RegisterService;

  constructor() {
    this.authLogic = new RegisterService();
  }

  execute = async (
    request: FastifyRequest<{ Body: CreateUserParams }>,
    reply: FastifyReply,
  ) => {
    const userData = registerBodySchema.parse(request.body);
    const user = await this.authLogic.execute(userData);

    reply.status(201).send(user);
  };
}

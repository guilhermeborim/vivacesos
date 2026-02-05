import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterInviteService } from "../../../../domain/invite/services/invite";
import { CreateInviteParams } from "../../../database/typeorm/sass/interfaces/invite";
import { registerInviteBodySchema } from "../../routes/schemas/invite/invite.schema";

export class RegisterInviteController {
  private inviteLogic: RegisterInviteService;

  constructor() {
    this.inviteLogic = new RegisterInviteService();
  }

  execute = async (
    request: FastifyRequest<{ Body: CreateInviteParams }>,
    reply: FastifyReply,
  ) => {
    const body = registerInviteBodySchema.parse(request.body);

    const clinicId = request.clinicId;

    const createInvite = await this.inviteLogic.execute(body, clinicId);

    reply.send(createInvite);
  };
}

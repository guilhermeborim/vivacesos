import { FastifyReply, FastifyRequest } from "fastify";
import { registerInviteBodySchema } from "../../../../infra/web/routes/schemas/invite/invite.schema";
import { RegisterInviteService } from "../services/Invite";
import { CreateInviteParams } from "../types";

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

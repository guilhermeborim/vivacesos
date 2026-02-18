import { FastifyReply, FastifyRequest } from "fastify";
import { GetInviteByTokenService } from "../services/GetInviteByToken";

export class GetInviteByTokenController {
  private inviteLogic: GetInviteByTokenService;

  constructor() {
    this.inviteLogic = new GetInviteByTokenService();
  }

  execute = async (
    request: FastifyRequest<{ Params: { token: string } }>,
    reply: FastifyReply,
  ) => {
    const token = request.params.token;

    const invite = await this.inviteLogic.execute(token);

    reply.send(invite);
  };
}

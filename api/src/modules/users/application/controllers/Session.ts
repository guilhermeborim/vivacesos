import { FastifyReply, FastifyRequest } from "fastify";
import { SessionService } from "../services/Session";

export class SessionController {
  private sessionLogic: SessionService;

  constructor() {
    this.sessionLogic = new SessionService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const clinicId = request.clinicId;

    const session = await this.sessionLogic.execute(
      clinicId as string,
      request.user.id,
    );

    reply.send(session);
  };
}

import { FastifyReply, FastifyRequest } from "fastify";
import { SessionService } from "../../../../domain/user/services/session";

export class SessionController {
  private sessionLogic: SessionService;

  constructor() {
    this.sessionLogic = new SessionService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const clinicId = request.headers["x-clinic-authorization"];
    const session = await this.sessionLogic.execute(
      clinicId as string,
      request.user.id,
    );

    reply.send(session);
  };
}

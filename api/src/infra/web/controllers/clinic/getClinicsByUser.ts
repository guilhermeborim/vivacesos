import { FastifyReply, FastifyRequest } from "fastify";
import { GetClinicsByUserService } from "../../../../domain/clinicUser/services/getClinicsByUser";

export class GetClinicsByUserController {
  private clinicUserLogic: GetClinicsByUserService;

  constructor() {
    this.clinicUserLogic = new GetClinicsByUserService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const clinicUser = await this.clinicUserLogic.execute(request.user.id);

    reply.send(clinicUser);
  };
}

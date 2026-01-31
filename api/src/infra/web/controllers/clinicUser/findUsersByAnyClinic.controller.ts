import { FastifyReply, FastifyRequest } from "fastify";
import { FindUsersByAnyClinicService } from "../../../../domain/clinicUser/services/findUsersByAnyClinic";

export class FindUsersByAnyClinicController {
  private clinicUserLogic: FindUsersByAnyClinicService;

  constructor() {
    this.clinicUserLogic = new FindUsersByAnyClinicService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const clinicUser = await this.clinicUserLogic.execute(request.user.id);

    reply.send(clinicUser);
  };
}

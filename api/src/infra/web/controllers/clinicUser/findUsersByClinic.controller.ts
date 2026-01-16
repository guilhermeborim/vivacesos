import { FastifyReply, FastifyRequest } from "fastify";
import { FindUsersByClinicService } from "../../../../domain/clinicUser/services/findUsersByClinic";

export class FindUsersByClinicController {
  private clinicUserLogic: FindUsersByClinicService;

  constructor() {
    this.clinicUserLogic = new FindUsersByClinicService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const clinicUser = await this.clinicUserLogic.execute(request.clinicId);

    reply.send(clinicUser);
  };
}

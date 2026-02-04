import { FastifyReply, FastifyRequest } from "fastify";
import { GetUsersByClinicService } from "../../../../domain/clinicUser/services/getUsersByClinic";

export class GetUsersByClinicController {
  private clinicUserLogic: GetUsersByClinicService;

  constructor() {
    this.clinicUserLogic = new GetUsersByClinicService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const clinicUser = await this.clinicUserLogic.execute(request.clinicId);

    reply.send(clinicUser);
  };
}

import { FastifyReply, FastifyRequest } from "fastify";
import { GetProfessionalsByClinicService } from "../../../professional/application/services/GetProfessionalByClinic";

export class GetProfessionalsByClinicController {
  private professionalLogic: GetProfessionalsByClinicService;

  constructor() {
    this.professionalLogic = new GetProfessionalsByClinicService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const professionals = await this.professionalLogic.execute(
      request.clinicId,
    );
    reply.send(professionals);
  };
}

import { FastifyReply, FastifyRequest } from "fastify";
import { GetPatientsByClinicService } from "../../../../domain/patient/services/getPatientsByClinic";

export class GetPatientsByClinicController {
  private patientLogic: GetPatientsByClinicService;

  constructor() {
    this.patientLogic = new GetPatientsByClinicService();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const patients = await this.patientLogic.execute(request.clinicId);

    reply.send(patients);
  };
}

import { FastifyReply, FastifyRequest } from "fastify";
import { registerPatientBodySchema } from "../../../../infra/web/routes/schemas/patient/register.schema";
import { RegisterPatientService } from "../services/Register";
import { CreatePatientParams } from "../types";

export class RegisterPatientController {
  private patientLogic: RegisterPatientService;

  constructor() {
    this.patientLogic = new RegisterPatientService();
  }

  execute = async (
    request: FastifyRequest<{ Body: CreatePatientParams }>,
    reply: FastifyReply,
  ) => {
    const patientData = registerPatientBodySchema.parse(request.body);
    await this.patientLogic.execute(request.clinicId, patientData);
    reply.send();
  };
}

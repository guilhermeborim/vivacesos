import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterPatientService } from "../../../../domain/patient/services/register";
import { CreatePatientParams } from "../../../database/typeorm/sass/interfaces/patient";
import { registerPatientBodySchema } from "../../routes/schemas/patient/register.schema";

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
    const patient = await this.patientLogic.execute(
      request.clinicId,
      patientData,
    );
    reply.send(patient);
  };
}

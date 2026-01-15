import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterClinicService } from "../../../../domain/clinic/register";
import { CreateClinicParams } from "../../../database/typeorm/sass/repositories/interfaces/clinic-repository.interface";
import { registerClinicBodySchema } from "../../routes/schemas/clinic/register.schema";

export class RegisterClinicController {
  private clinicLogic: RegisterClinicService;

  constructor() {
    this.clinicLogic = new RegisterClinicService();
  }

  execute = async (
    request: FastifyRequest<{ Body: CreateClinicParams }>,
    reply: FastifyReply
  ) => {
    const clinicData = registerClinicBodySchema.parse(request.body);
    const clinic = await this.clinicLogic.execute(clinicData);
    reply.send(clinic);
  };
}

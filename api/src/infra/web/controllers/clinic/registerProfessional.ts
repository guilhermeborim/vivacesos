import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterProfessionalService } from "../../../../domain/professional/services/register";
import { CreateProfessionalParams } from "../../../database/typeorm/sass/interfaces/professional";
import { registerProfessionalBodySchema } from "../../routes/schemas/professional/register.schema";

export class RegisterProfessionalController {
  private professionalLogic: RegisterProfessionalService;

  constructor() {
    this.professionalLogic = new RegisterProfessionalService();
  }

  execute = async (
    request: FastifyRequest<{ Body: CreateProfessionalParams }>,
    reply: FastifyReply,
  ) => {
    const professionalData = registerProfessionalBodySchema.parse(request.body);
    const professional = await this.professionalLogic.execute(
      request.clinicId,
      professionalData,
    );
    reply.send(professional);
  };
}

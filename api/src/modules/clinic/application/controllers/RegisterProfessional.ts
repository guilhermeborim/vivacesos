import { FastifyReply, FastifyRequest } from "fastify";
import { registerProfessionalBodySchema } from "../../../../infra/web/routes/schemas/professional/register.schema";
import { RegisterProfessionalService } from "../../../professional/application/services/Register";
import { CreateProfessionalParams } from "../../../professional/application/types";

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

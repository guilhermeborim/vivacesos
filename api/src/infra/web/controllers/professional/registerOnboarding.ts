import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterProfessionalOnboardingService } from "../../../../domain/professional/services/registerOnboarding";
import { CreateProfessionalOnboardingParams } from "../../../database/typeorm/sass/interfaces/professional";
import { registerProfessionalOnboardingBodySchema } from "../../routes/schemas/professional/registerOnboarding.schema";

export class RegisterProfessionalOnboardingController {
  private professionalLogic: RegisterProfessionalOnboardingService;

  constructor() {
    this.professionalLogic = new RegisterProfessionalOnboardingService();
  }

  execute = async (
    request: FastifyRequest<{ Body: CreateProfessionalOnboardingParams }>,
    reply: FastifyReply,
  ) => {
    const professionalData = registerProfessionalOnboardingBodySchema.parse(
      request.body,
    );
    const professional = await this.professionalLogic.execute(professionalData);
    reply.send(professional);
  };
}

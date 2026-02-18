import { FastifyReply, FastifyRequest } from "fastify";
import { registerProfessionalOnboardingBodySchema } from "../../../../infra/web/routes/schemas/professional/registerOnboarding.schema";
import { RegisterProfessionalOnboardingService } from "../services/RegisterOnboarding";
import { CreateProfessionalOnboardingParams } from "../types";

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

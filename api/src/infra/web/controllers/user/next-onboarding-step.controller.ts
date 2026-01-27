import { FastifyReply, FastifyRequest } from "fastify";
import { NextOnboardingStepRequest } from "../../../../domain/user/interfaces/nextOnboardingStepRequest";
import { NextOnboardingStepService } from "../../../../domain/user/services/next-onboarding-step";
import { nextOnboardingStepBodySchema } from "../../routes/schemas/user/next-onboarding-step.schema";

export class NextOnboardingStepController {
  private nextOnboardingStepLogic: NextOnboardingStepService;

  constructor() {
    this.nextOnboardingStepLogic = new NextOnboardingStepService();
  }

  execute = async (
    request: FastifyRequest<{ Body: NextOnboardingStepRequest }>,
    reply: FastifyReply,
  ) => {
    const userId = request.user.id;
    const { step } = nextOnboardingStepBodySchema.parse(request.body);

    await this.nextOnboardingStepLogic.execute(userId, step);

    reply.send();
  };
}

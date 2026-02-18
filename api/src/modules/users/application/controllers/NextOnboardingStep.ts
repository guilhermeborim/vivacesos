import { FastifyReply, FastifyRequest } from "fastify";
import { nextOnboardingStepBodySchema } from "../../../../infra/web/routes/schemas/user/next-onboarding-step.schema";
import { NextOnboardingStepService } from "../services/NextOnboardingStep";
import { UserNextOnboardingStepParams } from "../types";

export class NextOnboardingStepController {
  private nextOnboardingStepLogic: NextOnboardingStepService;

  constructor() {
    this.nextOnboardingStepLogic = new NextOnboardingStepService();
  }

  execute = async (
    request: FastifyRequest<{ Body: UserNextOnboardingStepParams }>,
    reply: FastifyReply,
  ) => {
    const userId = request.user.id;
    const { step } = nextOnboardingStepBodySchema.parse(request.body);

    await this.nextOnboardingStepLogic.execute(userId, step);

    reply.send();
  };
}

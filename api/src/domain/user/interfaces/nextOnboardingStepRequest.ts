import { UserOnboardingStep } from "../../../infra/database/typeorm/sass/entities/User";

export interface NextOnboardingStepRequest {
  userId: string;
  step: UserOnboardingStep;
}

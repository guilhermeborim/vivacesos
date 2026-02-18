import { UserOnboardingStep } from "../../../../infra/database/typeorm/sass/entities/User";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  onboardingStep: UserOnboardingStep;
  emailVerified: boolean;
  active: boolean;
}

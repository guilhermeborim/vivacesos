import { User, UserOnboardingStep } from "../../entities/User";

export interface UserCreateParams {
  name: string;
  email: string;
  password: string;
  active?: boolean;
  emailVerified?: boolean;
}

export interface UserLoginParams {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface UserNextOnboardingStepParams {
  userId: string;
  step: UserOnboardingStep;
}

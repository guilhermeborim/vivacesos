import {
  User,
  UserOnboardingStep,
} from "../../../../infra/database/typeorm/sass/entities/User";

export type UserCreateParams = {
  name: string;
  email: string;
  password: string;
  active?: boolean;
  emailVerified?: boolean;
};

export type UserLoginParams = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  user: User;
  token: string;
  refreshToken: string;
};

export type UserNextOnboardingStepParams = {
  userId: string;
  step: UserOnboardingStep;
};

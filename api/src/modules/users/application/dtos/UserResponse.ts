import { UserOnboardingStep } from "../../../../infra/database/typeorm/sass/entities/User";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  onboardingStep: UserOnboardingStep;
  emailVerified: boolean;
  active: boolean;
};

export type GetSessionUserResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    onboardingStep: UserOnboardingStep;
  };
  clinics: {
    clinicId: string;
    name: string;
  }[];
  activeClinic: {
    clinicId: string;
    name: string;
  } | null;
  role: string | null;
  permissions: string[] | null;
};

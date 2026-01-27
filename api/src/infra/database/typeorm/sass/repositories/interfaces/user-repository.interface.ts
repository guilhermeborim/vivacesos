import { User, UserOnboardingStep } from "../../entities/User";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  active?: boolean;
  emailVerified?: boolean;
}

export interface UserRepositoryInterface {
  createUser(data: CreateUserParams): Promise<User>;
  nextOnboardingStep(userId: string, step: UserOnboardingStep): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

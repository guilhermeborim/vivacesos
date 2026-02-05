import { User, UserOnboardingStep } from "../../entities/User";
import { UserCreateParams } from "../../interfaces/user";

export interface UserRepositoryInterface {
  createUser(data: UserCreateParams): Promise<User>;
  nextOnboardingStep(userId: string, step: UserOnboardingStep): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

import {
  User,
  UserOnboardingStep,
} from "../../../../infra/database/typeorm/sass/entities/User";
import { UserCreateParams } from "../../application/types";

export interface UserRepositoryInterface {
  createUser(data: UserCreateParams): Promise<User>;
  nextOnboardingStep(userId: string, step: UserOnboardingStep): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

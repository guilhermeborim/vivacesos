import { UserOnboardingStep } from "../../../../infra/database/typeorm/sass/entities/User";
import { UserResponse } from "../../application/dtos/UserResponse";
import { UserCreateParams } from "../../application/types";

export interface UserRepositoryInterface {
  createUser(data: UserCreateParams): Promise<UserResponse>;
  nextOnboardingStep(userId: string, step: UserOnboardingStep): Promise<void>;
  findByEmail(email: string): Promise<UserResponse | null>;
  findById(id: string): Promise<UserResponse | null>;
}

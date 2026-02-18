import { Repository } from "typeorm";
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source";
import {
  User,
  UserOnboardingStep,
} from "../../../../infra/database/typeorm/sass/entities/User";
import { DatabaseError } from "../../../../shared/errors/database.error";
import { UserCreateParams } from "../../application/types";
import { UserRepositoryInterface } from "../interface/UserRepositoryInterface";

export class UserTypeormRepository implements UserRepositoryInterface {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = SassDataSource.getRepository(User);
  }

  async createUser(
    user: UserCreateParams,
    onboardingStep?: UserOnboardingStep,
  ): Promise<User> {
    try {
      const userCreated = await this.userRepository.save({
        ...user,
        onboardingStep: onboardingStep
          ? onboardingStep
          : UserOnboardingStep.CREATE_CLINIC,
      });
      return userCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar usuário!", error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuário!", error);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuário!", error);
    }
  }

  async nextOnboardingStep(
    userId: string,
    step: UserOnboardingStep,
  ): Promise<void> {
    try {
      await this.userRepository.update(userId, { onboardingStep: step });
    } catch (error) {
      throw new DatabaseError(
        "Falha ao atualizar passo de onboarding do usuário!",
        error,
      );
    }
  }
}

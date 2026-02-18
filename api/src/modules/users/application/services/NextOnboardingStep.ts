import { UserOnboardingStep } from "../../../../infra/database/typeorm/sass/entities/User";
import { NotFoundError } from "../../../../shared/errors/not-found.error";
import { UserTypeormRepository } from "../../database/repositories/UserTypeormRepository";

export class NextOnboardingStepService {
  private UserRepository: UserTypeormRepository;

  constructor() {
    this.UserRepository = new UserTypeormRepository();
  }

  async execute(userId: string, step: UserOnboardingStep) {
    const user = await this.UserRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }

    const nextOnboardingStep = await this.UserRepository.nextOnboardingStep(
      userId,
      step,
    );

    return {
      nextOnboardingStep,
    };
  }
}

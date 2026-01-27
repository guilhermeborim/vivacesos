import { UserOnboardingStep } from "../../../infra/database/typeorm/sass/entities/User";
import { UserTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/user.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";

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

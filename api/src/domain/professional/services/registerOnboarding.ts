import { hashSync } from "bcrypt";
import { Professional } from "../../../infra/database/typeorm/sass/entities/Professional";
import { CreateProfessionalOnboardingParams } from "../../../infra/database/typeorm/sass/interfaces/professional";
import { ProfessionalTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/professional.repository";

export class RegisterProfessionalOnboardingService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(
    professional: CreateProfessionalOnboardingParams,
  ): Promise<Professional> {
    if (professional.crm) {
      const crmHash = hashSync(professional.crm, 10);
      professional.crm = crmHash;
    }

    const professionalCreated =
      await this.professionalRepository.createProfessionalOnboarding(
        professional,
      );

    return professionalCreated;
  }
}

import { hashSync } from "bcrypt";
import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional";
import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository";
import { CreateProfessionalOnboardingParams } from "../types";

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

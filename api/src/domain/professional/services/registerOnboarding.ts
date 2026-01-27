import { hashSync } from "bcrypt";
import { CreateProfessionalOnboardingParams } from "../../../infra/database/typeorm/sass/repositories/interfaces/professional-repository.interface";
import { ProfessionalTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/professional.repository";
import { ProfessionalResponse } from "../interfaces/professionalResponse";

export class RegisterProfessionalOnboardingService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(
    professional: CreateProfessionalOnboardingParams,
  ): Promise<ProfessionalResponse> {
    if (professional.crm) {
      const crmHash = hashSync(professional.crm, 10);
      professional.crm = crmHash;
    }

    const professionalCreated =
      await this.professionalRepository.createProfessionalOnboarding(
        professional,
      );

    return {
      professional: professionalCreated,
    };
  }
}

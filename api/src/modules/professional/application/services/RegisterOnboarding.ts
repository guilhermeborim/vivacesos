import { encrypt, hash } from "../../../../shared/utils/crypto";
import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository";
import { ProfessionalResponse } from "../dtos/ProfessionalResponse";
import { CreateProfessionalOnboardingParams } from "../types";

export class RegisterProfessionalOnboardingService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(
    professional: CreateProfessionalOnboardingParams,
  ): Promise<ProfessionalResponse> {
    const crmHash = hash(professional.crm);

    professional.crmHash = crmHash;
    professional.crm = encrypt(professional.crm);

    const professionalCreated =
      await this.professionalRepository.createProfessionalOnboarding(
        professional,
      );

    return professionalCreated;
  }
}

import { hashSync } from "bcrypt";
import { CreateProfessionalParams } from "../../../infra/database/typeorm/sass/repositories/interfaces/professional-repository.interface";
import { ProfessionalTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/professional.repository";
import { ProfessionalResponse } from "../interfaces/professionalResponse";

export class RegisterProfessionalService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(
    clinicId: string,
    professional: CreateProfessionalParams,
  ): Promise<ProfessionalResponse> {
    if (professional.crm) {
      const crmHash = hashSync(professional.crm, 10);
      professional.crm = crmHash;
    }

    const professionalCreated =
      await this.professionalRepository.createProfessional(
        clinicId,
        professional,
      );

    return {
      professional: professionalCreated,
    };
  }
}

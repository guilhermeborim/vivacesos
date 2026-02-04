import { hashSync } from "bcrypt";
import { Professional } from "../../../infra/database/typeorm/sass/entities/Professional";
import { CreateProfessionalParams } from "../../../infra/database/typeorm/sass/interfaces/professional";
import { ProfessionalTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/professional.repository";

export class RegisterProfessionalService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(
    clinicId: string,
    professional: CreateProfessionalParams,
  ): Promise<Professional> {
    if (professional.crm) {
      const crmHash = hashSync(professional.crm, 10);
      professional.crm = crmHash;
    }

    const professionalCreated =
      await this.professionalRepository.createProfessional(
        clinicId,
        professional,
      );

    return professionalCreated;
  }
}

import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional";
import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository";

export class GetProfessionalsByClinicService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(clinicId: string): Promise<Professional[]> {
    const professionals =
      await this.professionalRepository.getProfessionalsByClinicId(clinicId);

    return professionals;
  }
}

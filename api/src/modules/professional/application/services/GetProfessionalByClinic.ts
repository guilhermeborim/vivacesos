import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository";
import { ProfessionalResponse } from "../dtos/ProfessionalResponse";

export class GetProfessionalsByClinicService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(clinicId: string): Promise<ProfessionalResponse[]> {
    const professionals =
      await this.professionalRepository.getProfessionalsByClinicId(clinicId);

    return professionals;
  }
}

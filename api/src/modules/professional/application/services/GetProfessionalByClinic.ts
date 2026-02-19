import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository";
import { GetProfessionalsByClinicResponse } from "../dtos/ProfessionalResponse";
import { GetProfessionalsByClinicMapper } from "../mappers/ProfessionalMapper";

export class GetProfessionalsByClinicService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(clinicId: string): Promise<GetProfessionalsByClinicResponse[]> {
    const professionals =
      await this.professionalRepository.getProfessionalsByClinicId(clinicId);

    return professionals.map(GetProfessionalsByClinicMapper.toResponse);
  }
}

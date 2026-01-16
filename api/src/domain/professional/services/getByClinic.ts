import { ProfessionalTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/professional.repository";
import { ProfessionalsResponse } from "../interfaces/professionalResponse";

export class GetProfessionalsByClinicService {
  private professionalRepository: ProfessionalTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
  }

  async execute(clinicId: string): Promise<ProfessionalsResponse> {
    const professionals =
      await this.professionalRepository.findProfessionalByClinicId(clinicId);

    return {
      professionals: professionals,
    };
  }
}

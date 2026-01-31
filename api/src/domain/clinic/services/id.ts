import { Clinic } from "../../../infra/database/typeorm/sass/entities/Clinic";
import { ClinicTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic.repository";
import { decrypt } from "../../../infra/utils/crypto";
import { NotFoundError } from "../../../shared/errors/not-found.error";

export class FindClinicIdService {
  private clinicRepository: ClinicTypeormRepository;

  constructor() {
    this.clinicRepository = new ClinicTypeormRepository();
  }

  async execute(clinicId: string): Promise<Clinic> {
    const clinicCreated = await this.clinicRepository.findById(clinicId);

    if (!clinicCreated) {
      throw new NotFoundError("Clinica não encontrada");
    }

    clinicCreated.cnpj = decrypt(clinicCreated.cnpj);

    return clinicCreated;
  }
}

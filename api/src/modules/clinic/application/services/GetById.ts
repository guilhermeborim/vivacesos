import { Clinic } from "../../../../infra/database/typeorm/sass/entities/Clinic";
import { NotFoundError } from "../../../../shared/errors/not-found.error";
import { decrypt } from "../../../../shared/utils/crypto";
import { ClinicTypeormRepository } from "../../database/repositories/ClinicTypeormRepository";

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

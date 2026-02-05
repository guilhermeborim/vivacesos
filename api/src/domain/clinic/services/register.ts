import { Clinic } from "../../../infra/database/typeorm/sass/entities/Clinic";
import { ClinicCreateParams } from "../../../infra/database/typeorm/sass/interfaces/clinic";
import { ClinicTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic.repository";
import { encrypt } from "../../../infra/utils/crypto";
import { ConflictError } from "../../../shared/errors/conflict.error";

export class RegisterClinicService {
  private clinicRepository: ClinicTypeormRepository;

  constructor() {
    this.clinicRepository = new ClinicTypeormRepository();
  }

  async execute(clinic: ClinicCreateParams): Promise<Clinic> {
    const clinicExistsByCnpj = await this.clinicRepository.findByCnpj(
      null,
      clinic.cnpj,
    );

    if (clinicExistsByCnpj) {
      throw new ConflictError("CNPJ já está cadastrado!");
    }

    const clinicExistsByPhone = await this.clinicRepository.findByPhone(
      null,
      clinic.phone,
    );

    if (clinicExistsByPhone) {
      throw new ConflictError("Telefone já está cadastrado!");
    }

    const encryptedCnpj = encrypt(clinic.cnpj);

    clinic.cnpj = encryptedCnpj;

    const clinicCreated = await this.clinicRepository.createClinic(clinic);

    return clinicCreated;
  }
}

import { ClinicUpdateParams } from "../../../infra/database/typeorm/sass/interfaces/clinic";
import { ClinicTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic.repository";
import { encrypt } from "../../../infra/utils/crypto";
import { ConflictError } from "../../../shared/errors/conflict.error";

export class UpdateClinicService {
  private clinicRepository: ClinicTypeormRepository;

  constructor() {
    this.clinicRepository = new ClinicTypeormRepository();
  }

  async execute(clinicId: string, clinic: ClinicUpdateParams): Promise<void> {
    const clinicExisting = await this.clinicRepository.findById(clinicId);

    if (!clinicExisting) {
      throw new ConflictError("Clínica não encontrada!");
    }

    const clinicExistsByCnpj = await this.clinicRepository.findByCnpj(
      clinicId,
      clinicExisting.cnpj,
    );

    if (clinicExistsByCnpj) {
      throw new ConflictError("CNPJ já está cadastrado!");
    }

    const clinicExistsByPhone = await this.clinicRepository.findByPhone(
      clinicId,
      clinicExisting.phone,
    );

    if (clinicExistsByPhone) {
      throw new ConflictError("Telefone já está cadastrado!");
    }

    if (clinic.cnpj) {
      const encryptedCnpj = encrypt(clinic.cnpj);

      clinic.cnpj = encryptedCnpj;
    }

    await this.clinicRepository.updateClinic(clinicId, clinic);
  }
}

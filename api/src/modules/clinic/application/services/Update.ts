import { ConflictError } from "../../../../shared/errors/conflict.error";
import { encrypt } from "../../../../shared/utils/crypto";
import { ClinicTypeormRepository } from "../../database/repositories/ClinicTypeormRepository";
import { ClinicUpdateParams } from "../types";

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

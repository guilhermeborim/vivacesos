import { ConflictError } from "../../../../shared/errors/conflict.error";
import { encrypt } from "../../../../shared/utils/crypto";
import { ClinicTypeormRepository } from "../../database/repositories/ClinicTypeormRepository";
import { ClinicResponse } from "../dtos/ClinicResponse";
import { ClinicCreateParams } from "../types";

export class RegisterClinicService {
  private clinicRepository: ClinicTypeormRepository;

  constructor() {
    this.clinicRepository = new ClinicTypeormRepository();
  }

  async execute(clinic: ClinicCreateParams): Promise<ClinicResponse> {
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

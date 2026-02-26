import { ConflictError } from "../../../../shared/errors/conflict.error"
import { encrypt, hash } from "../../../../shared/utils/crypto"
import { replacePayloadString } from "../../../../shared/utils/format"
import { ClinicTypeormRepository } from "../../database/repositories/ClinicTypeormRepository"
import { ClinicResponse } from "../dtos/ClinicResponse"
import { ClinicCreateParams } from "../types"

export class RegisterClinicService {
  private clinicRepository: ClinicTypeormRepository

  constructor() {
    this.clinicRepository = new ClinicTypeormRepository()
  }

  async execute(clinic: ClinicCreateParams): Promise<ClinicResponse> {
    const cnpjHash = hash(replacePayloadString(clinic.cnpj))
    const phoneReplace = replacePayloadString(clinic.phone)

    const clinicExistsByCnpj = await this.clinicRepository.findByCnpj(null, cnpjHash)

    if (clinicExistsByCnpj) {
      throw new ConflictError("CNPJ já está cadastrado!")
    }

    const clinicExistsByPhone = await this.clinicRepository.findByPhone(
      null,
      phoneReplace,
    )

    if (clinicExistsByPhone) {
      throw new ConflictError("Telefone já está cadastrado!")
    }

    clinic.cnpjHash = cnpjHash
    clinic.cnpj = encrypt(replacePayloadString(clinic.cnpj))
    clinic.phone = phoneReplace

    const clinicCreated = await this.clinicRepository.createClinic(clinic)

    return clinicCreated
  }
}

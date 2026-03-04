import { ConflictError } from "../../../../shared/errors/conflict.error"
import { encrypt, hash } from "../../../../shared/utils/crypto"
import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository"
import { UpdateProfessionalParams } from "../types"

export class UpdateProfessionalService {
  private professionalRepository: ProfessionalTypeormRepository

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository()
  }

  async execute(
    clinicId: string,
    professionalId: string,
    data: UpdateProfessionalParams,
  ): Promise<void> {
    const professional = await this.professionalRepository.findById(professionalId)

    if (!professional) {
      throw new ConflictError("Profissional não encontrado!")
    }

    if (data.crm) {
      const crmHash = hash(data.crm)

      const crmAlreadyExists =
        await this.professionalRepository.getCrmProfessionalByClinicIdExcluding(
          clinicId,
          crmHash,
          professionalId,
        )

      if (crmAlreadyExists) {
        throw new ConflictError("Este CRM já está cadastrado nesta clínica!")
      }

      data.crmHash = crmHash
      data.crm = encrypt(data.crm)
    }

    await this.professionalRepository.updateProfessional(professionalId, data)
  }
}

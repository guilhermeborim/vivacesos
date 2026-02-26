import { ConflictError } from "../../../../shared/errors/conflict.error"
import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error"
import { encrypt, hash } from "../../../../shared/utils/crypto"
import { replacePayloadString } from "../../../../shared/utils/format"
import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository"
import { ProfessionalResponse } from "../dtos/ProfessionalResponse"
import { CreateProfessionalParams } from "../types"

export class RegisterProfessionalService {
  private professionalRepository: ProfessionalTypeormRepository

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository()
  }

  async execute(
    clinicId: string,
    professional: CreateProfessionalParams,
  ): Promise<ProfessionalResponse> {
    const crmHash = hash(replacePayloadString(professional.crm))

    const crmProfessionalVinculedInClinic =
      await this.professionalRepository.getCrmProfessionalByClinicId(clinicId, crmHash)

    if (crmProfessionalVinculedInClinic) {
      throw new ConflictError("Este CRM já está cadastrado nesta clínica!")
    }

    const professionalVinculedInClinic =
      await this.professionalRepository.getProfessionalByClinicId(
        clinicId,
        professional.userId,
      )

    if (professionalVinculedInClinic) {
      throw new UnauthenticatedError("Profissional já vinculado nesta clínica!")
    }

    professional.crmHash = crmHash
    professional.crm = encrypt(replacePayloadString(professional.crm))

    const professionalCreated = await this.professionalRepository.createProfessional(
      clinicId,
      professional,
    )

    return professionalCreated
  }
}

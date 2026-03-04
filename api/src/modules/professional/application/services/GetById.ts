import { ConflictError } from "../../../../shared/errors/conflict.error"
import { decrypt } from "../../../../shared/utils/crypto"
import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository"
import { ProfessionalResponse } from "../dtos/ProfessionalResponse"

export class GetProfessionalByIdService {
  private professionalRepository: ProfessionalTypeormRepository

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository()
  }

  async execute(professionalId: string): Promise<ProfessionalResponse> {
    const professional = await this.professionalRepository.findById(professionalId)

    if (!professional) {
      throw new ConflictError("Profissional não encontrado!")
    }

    return {
      id: professional.id,
      userId: professional.userId,
      clinicId: professional.clinicId,
      name: professional.user.name,
      type: professional.type,
      crm: decrypt(professional.crm),
      specialty: professional.specialty,
      active: professional.active,
      createdAt: professional.createdAt,
      updatedAt: professional.updatedAt,
    }
  }
}

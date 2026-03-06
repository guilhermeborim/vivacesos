import { ConflictError } from "../../../../shared/errors/conflict.error"
import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository"
import { GetProfessionalByIdResponse } from "../dtos/ProfessionalResponse"
import { GetProfessionalByIdMapper } from "../mappers/ProfessionalMapper"

export class GetProfessionalByIdService {
  private professionalRepository: ProfessionalTypeormRepository

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository()
  }

  async execute(professionalId: string): Promise<GetProfessionalByIdResponse> {
    const professional = await this.professionalRepository.findById(professionalId)

    if (!professional) {
      throw new ConflictError("Profissional não encontrado!")
    }

    return GetProfessionalByIdMapper.toResponse(professional)
  }
}

import { NotFoundError } from "../../../../shared/errors/not-found.error"
import { ClinicTypeormRepository } from "../../database/repositories/ClinicTypeormRepository"
import { ClinicResponse } from "../dtos/ClinicResponse"
import { GetClinicByidMapper } from "../mappers/ClinicMapper"

export class FindClinicIdService {
  private clinicRepository: ClinicTypeormRepository

  constructor() {
    this.clinicRepository = new ClinicTypeormRepository()
  }

  async execute(clinicId: string): Promise<ClinicResponse> {
    const clinicCreated = await this.clinicRepository.findById(clinicId)

    if (!clinicCreated) {
      throw new NotFoundError("Clinica não encontrada")
    }

    return GetClinicByidMapper.toResponse({
      ...clinicCreated,
    })
  }
}

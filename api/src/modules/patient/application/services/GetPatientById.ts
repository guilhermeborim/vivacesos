import { NotFoundError } from "../../../../shared/errors/not-found.error"
import { PatientTypeormRepository } from "../../database/repositories/PatientTypeormRepository"
import { GetPatientsResponse } from "../dtos/PatientResponse"
import { PatientMapper } from "../mappers/PatientMapper"

export class GetPatientByIdService {
  private patientRepository: PatientTypeormRepository

  constructor() {
    this.patientRepository = new PatientTypeormRepository()
  }

  async execute(clinicId: string, patientId: string): Promise<GetPatientsResponse> {
    const patient = await this.patientRepository.getPatientByIdInClinic(
      clinicId,
      patientId,
    )

    if (!patient) {
      throw new NotFoundError("Paciente não encontrado!")
    }

    return PatientMapper.toResponse(patient)
  }
}

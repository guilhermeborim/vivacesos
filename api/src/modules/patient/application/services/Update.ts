import { ConflictError } from "../../../../shared/errors/conflict.error"
import { encrypt, hash } from "../../../../shared/utils/crypto"
import { PatientTypeormRepository } from "../../database/repositories/PatientTypeormRepository"
import { UpdatePatientParams } from "../types"

export class UpdatePatientService {
  private patientRepository: PatientTypeormRepository

  constructor() {
    this.patientRepository = new PatientTypeormRepository()
  }

  async execute(
    clinicId: string,
    patientId: string,
    data: UpdatePatientParams,
  ): Promise<void> {
    const patient = await this.patientRepository.getPatientByIdInClinic(
      clinicId,
      patientId,
    )

    if (!patient) {
      throw new ConflictError("Paciente não encontrado!")
    }

    if (data.cpf) {
      const cpfHash = hash(data.cpf)

      const cpfAlreadyExists = await this.patientRepository.getPatientByCpfInClinic(
        cpfHash,
        clinicId,
      )

      if (cpfAlreadyExists) {
        throw new ConflictError("Este CPF já está cadastrado nesta clínica!")
      }

      data.cpfHash = cpfHash
      data.cpf = encrypt(data.cpf)
    }

    if (data.phone) {
      const phoneHash = hash(data.phone)

      const phoneAlreadyExists = await this.patientRepository.getPatientByPhoneInClinic(
        phoneHash,
        clinicId,
      )

      if (phoneAlreadyExists) {
        throw new ConflictError("Este TELEFONE já está cadastrado nesta clínica!")
      }

      data.phoneHash = phoneHash
      data.phone = encrypt(data.phone)
    }

    await this.patientRepository.updatePatientInClinic(patientId, data)
  }
}

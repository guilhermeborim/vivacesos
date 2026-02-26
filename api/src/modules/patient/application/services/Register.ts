import { ConflictError } from "../../../../shared/errors/conflict.error"
import { encrypt, hash } from "../../../../shared/utils/crypto"
import { replacePayloadString } from "../../../../shared/utils/format"
import { PatientTypeormRepository } from "../../database/repositories/PatientTypeormRepository"
import { CreatePatientParams } from "../types"

export class RegisterPatientService {
  private patientRepository: PatientTypeormRepository

  constructor() {
    this.patientRepository = new PatientTypeormRepository()
  }

  async execute(clinicId: string, patient: CreatePatientParams): Promise<void> {
    const cpfHash = hash(replacePayloadString(patient.cpf))
    const phoneHash = hash(replacePayloadString(patient.phone))

    const patientExistCpfByClinic = await this.patientRepository.getPatientByCpfInClinic(
      cpfHash,
      clinicId,
    )

    if (patientExistCpfByClinic) {
      throw new ConflictError("Este CPF já está cadastrado!")
    }

    const patientExistEmailByClinic =
      await this.patientRepository.getPatientByEmailInClinic(patient.email, clinicId)

    if (patientExistEmailByClinic) {
      throw new ConflictError("Este E-mail já está cadastrado!")
    }

    const patientExistPhoneByClinic =
      await this.patientRepository.getPatientByPhoneInClinic(phoneHash, clinicId)

    if (patientExistPhoneByClinic) {
      throw new ConflictError("Este Telefone já está cadastrado!")
    }

    patient.cpfHash = cpfHash
    patient.phoneHash = phoneHash
    patient.cpf = encrypt(replacePayloadString(patient.cpf))
    patient.phone = encrypt(replacePayloadString(patient.phone))

    return await this.patientRepository.createPatient(clinicId, patient)
  }
}

import { Patient } from "../../../../infra/database/typeorm/sass/entities/Patient"
import { decrypt } from "../../../../shared/utils/crypto"
import { maskCpf } from "../../../../shared/utils/mask"
import { GetPatientsResponse } from "../dtos/PatientResponse"

export class PatientMapper {
  static toResponse(patient: Patient): GetPatientsResponse {
    return {
      clinicId: patient.clinicId,
      patients: {
        patientId: patient.id,
        name: patient.name,
        email: patient.email,
        cpf: maskCpf(decrypt(patient.cpf)),
        phone: decrypt(patient.phone),
        birthDate: patient.birthDate,
        active: patient.active,
      },
    }
  }
}

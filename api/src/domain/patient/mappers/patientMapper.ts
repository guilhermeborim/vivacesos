import { Patient } from "../../../infra/database/typeorm/sass/entities/Patient";
import { decrypt } from "../../../infra/utils/crypto";
import { maskCpf } from "../../../infra/utils/mask";
import { PatientDto } from "../dtos/Patient";

export class PatientMapper {
  static toResponse(patient: Patient): PatientDto {
    return {
      id: patient.id,
      name: patient.name,
      email: patient.email,
      cpf: maskCpf(decrypt(patient.cpf)),
      phone: decrypt(patient.phone),
      birthDate: patient.birthDate,
      active: patient.active,
    };
  }
}

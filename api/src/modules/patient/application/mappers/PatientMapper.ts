import { Patient } from "../../../../infra/database/typeorm/sass/entities/Patient";
import { decrypt } from "../../../../shared/utils/crypto";
import { maskCpf } from "../../../../shared/utils/mask";
import { PatientResponse } from "../dtos/PatientResponse";

export class PatientMapper {
  static toResponse(patient: Patient): PatientResponse {
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

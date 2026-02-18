import { Patient } from "../../../../infra/database/typeorm/sass/entities/Patient";
import { decrypt } from "../../../../infra/utils/crypto";
import { maskCpf } from "../../../../infra/utils/mask";
import { UserResponse } from "../dtos/UserResponse";

export class UserMapper {
  static toResponse(patient: Patient): UserResponse {
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

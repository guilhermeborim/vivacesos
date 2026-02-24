import { Clinic } from "../../../../infra/database/typeorm/sass/entities/Clinic"
import { decrypt } from "../../../../shared/utils/crypto"
import { ClinicResponse } from "../dtos/ClinicResponse"

export class GetClinicsByUserMapper {
  static toResponse(clinic: Clinic): ClinicResponse {
    return {
      clinic: {
        city: clinic.city,
        cnpj: decrypt(clinic.cnpj),
        id: clinic.id,
        name: clinic.name,
        phone: clinic.phone,
      },
    }
  }
}

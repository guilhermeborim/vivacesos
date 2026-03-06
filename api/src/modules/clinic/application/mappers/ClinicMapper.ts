import { Clinic } from "../../../../infra/database/typeorm/sass/entities/Clinic"
import { decrypt } from "../../../../shared/utils/crypto"
import { GetClinicByIdResponse } from "../dtos/ClinicResponse"

export class GetClinicByidMapper {
  static toResponse(clinic: Clinic): GetClinicByIdResponse {
    return {
      clinic: {
        city: clinic.city,
        cnpj: decrypt(clinic.cnpj),
        clinicId: clinic.id,
        name: clinic.name,
        phone: clinic.phone,
        neighborhood: clinic.neighborhood,
        number: clinic.number,
        road: clinic.road,
        cep: clinic.cep,
        complement: clinic.complement,
      },
    }
  }
}

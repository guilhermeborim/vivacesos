import { Clinic } from "../../../../infra/database/typeorm/sass/entities/Clinic"
import { decrypt } from "../../../../shared/utils/crypto"
import { ClinicResponse } from "../dtos/ClinicResponse"

export class GetClinicsByUserMapper {
  static toResponse(clinic: Clinic): ClinicResponse {
    return {
      city: clinic.city,
      cnpj: decrypt(clinic.cnpj),
      id: clinic.id,
      name: clinic.name,
      phone: clinic.phone,
      neighborhood: clinic.neighborhood,
      number: clinic.number,
      road: clinic.road,
      cep: clinic.cep,
      complement: clinic.complement,
    }
  }
}

export class GetClinicByidMapper {
  static toResponse(clinic: Clinic): ClinicResponse {
    return {
      city: clinic.city,
      cnpj: decrypt(clinic.cnpj),
      id: clinic.id,
      name: clinic.name,
      phone: clinic.phone,
      neighborhood: clinic.neighborhood,
      number: clinic.number,
      road: clinic.road,
      cep: clinic.cep,
      complement: clinic.complement,
    }
  }
}

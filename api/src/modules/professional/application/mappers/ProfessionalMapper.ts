import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional"
import { decrypt } from "../../../../shared/utils/crypto"
import {
  GetProfessionalByIdResponse,
  GetProfessionalsByClinicResponse,
} from "../dtos/ProfessionalResponse"

export class GetProfessionalsByClinicMapper {
  static toResponse(professional: Professional): GetProfessionalsByClinicResponse {
    return {
      clinicId: professional.clinicId,
      userId: professional.userId,
      professional: {
        name: professional.user.name,
        specialty: professional.specialty,
        type: professional.type,
        crm: decrypt(professional.crm),
        active: professional.active,
        professionalId: professional.id,
      },
    }
  }
}

export class GetProfessionalByIdMapper {
  static toResponse(professional: Professional): GetProfessionalByIdResponse {
    return {
      clinicId: professional.clinicId,
      userId: professional.userId,
      professional: {
        name: professional.user.name,
        specialty: professional.specialty,
        type: professional.type,
        crm: decrypt(professional.crm),
        active: professional.active,
        professionalId: professional.id,
      },
    }
  }
}

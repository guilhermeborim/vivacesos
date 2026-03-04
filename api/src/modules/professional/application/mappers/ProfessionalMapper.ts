import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional"
import { decrypt } from "../../../../shared/utils/crypto"
import { GetProfessionalsByClinicResponse } from "../dtos/ProfessionalResponse"

export class GetProfessionalsByClinicMapper {
  static toResponse(professional: Professional): GetProfessionalsByClinicResponse {
    return {
      id: professional.id,
      clinicId: professional.clinicId,
      userId: professional.userId,
      professional: {
        name: professional.user.name,
        specialty: professional.specialty,
        type: professional.type,
        crm: decrypt(professional.crm),
        active: professional.active,
      },
    }
  }
}

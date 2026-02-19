import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional";
import { GetProfessionalsByClinicResponse } from "../dtos/ProfessionalResponse";

export class GetProfessionalsByClinicMapper {
  static toResponse(
    professional: Professional,
  ): GetProfessionalsByClinicResponse {
    return {
      clinicId: professional.clinicId,
      userId: professional.userId,
      professional: {
        name: professional.user.name,
        specialty: professional.specialty,
        type: professional.type,
      },
    };
  }
}

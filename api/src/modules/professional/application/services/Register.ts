import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error";
import { encrypt } from "../../../../shared/utils/crypto";
import { ClinicUsersTypeormRepository } from "../../../clinicUser/database/repositories/ClinicUserTypeormRepository";
import { ProfessionalTypeormRepository } from "../../database/repositories/ProfessionalTypeormRepository";
import { ProfessionalResponse } from "../dtos/ProfessionalResponse";
import { CreateProfessionalParams } from "../types";

export class RegisterProfessionalService {
  private professionalRepository: ProfessionalTypeormRepository;
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.professionalRepository = new ProfessionalTypeormRepository();
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(
    clinicId: string,
    professional: CreateProfessionalParams,
  ): Promise<ProfessionalResponse> {
    const professionalVinculedInClinic =
      await this.clinicUserRepository.getUserBindedClinic(
        clinicId,
        professional.userId,
      );

    if (professionalVinculedInClinic) {
      throw new UnauthenticatedError(
        "Profissional já vinculado nesta clínica!",
      );
    }

    if (professional.crm) {
      const crmHash = encrypt(professional.crm);
      professional.crm = crmHash;
    }

    const professionalCreated =
      await this.professionalRepository.createProfessional(
        clinicId,
        professional,
      );

    return professionalCreated;
  }
}

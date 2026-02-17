import { Professional } from "../../../infra/database/typeorm/sass/entities/Professional";
import { CreateProfessionalParams } from "../../../infra/database/typeorm/sass/interfaces/professional";
import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { ProfessionalTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/professional.repository";
import { encrypt } from "../../../infra/utils/crypto";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";

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
  ): Promise<Professional> {
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

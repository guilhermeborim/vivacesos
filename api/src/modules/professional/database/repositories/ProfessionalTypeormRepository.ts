import { Repository } from "typeorm";
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source";
import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional";
import { DatabaseError } from "../../../../shared/errors/database.error";
import {
  CreateProfessionalOnboardingParams,
  CreateProfessionalParams,
} from "../../application/types";
import { ProfessionalRepositoryInterface } from "../interface/ProfessionalRepositoryInterface";

export class ProfessionalTypeormRepository implements ProfessionalRepositoryInterface {
  private professionalRepository: Repository<Professional>;

  constructor() {
    this.professionalRepository = SassDataSource.getRepository(Professional);
  }

  async createProfessional(
    clinicId: string,
    professional: CreateProfessionalParams,
  ): Promise<Professional> {
    try {
      const professionalCreated = await this.professionalRepository.save({
        ...professional,
        clinicId,
      });

      return professionalCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar profissional!", error);
    }
  }

  async createProfessionalOnboarding(
    professional: CreateProfessionalOnboardingParams,
  ): Promise<Professional> {
    try {
      const professionalCreated = await this.professionalRepository.save({
        ...professional,
      });

      return professionalCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar profissional!", error);
    }
  }

  async getProfessionalsByClinicId(clinicId: string): Promise<Professional[]> {
    try {
      const professionals = await this.professionalRepository.query(
        `
          SELECT 
          pr.*,
          u.name,
          u.email
          FROM professionals pr 
          INNER JOIN users u ON pr."userId" = u."id"
          WHERE pr."clinicId" = $1
        `,
        [clinicId],
      );

      return professionals;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar profissionais!", error);
    }
  }
}

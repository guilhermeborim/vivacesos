import { Repository } from "typeorm";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { SassDataSource } from "../data-source";
import { Professional } from "../entities/Professional";
import {
  CreateProfessionalParams,
  ProfessionalRepositoryInterface,
} from "./interfaces/professional-repository.interface";

export class ProfessionalTypeormRepository
  implements ProfessionalRepositoryInterface
{
  private professionalRepository: Repository<Professional>;

  constructor() {
    this.professionalRepository = SassDataSource.getRepository(Professional);
  }

  async createProfessional(
    clinicId: string,
    professional: CreateProfessionalParams
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
}

import { Not, Repository } from "typeorm"
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source"
import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional"
import { DatabaseError } from "../../../../shared/errors/database.error"
import {
  CreateProfessionalOnboardingParams,
  CreateProfessionalParams,
  UpdateProfessionalParams,
} from "../../application/types"
import { ProfessionalRepositoryInterface } from "../interface/ProfessionalRepositoryInterface"

export class ProfessionalTypeormRepository implements ProfessionalRepositoryInterface {
  private professionalRepository: Repository<Professional>

  constructor() {
    this.professionalRepository = SassDataSource.getRepository(Professional)
  }

  async createProfessional(
    clinicId: string,
    professional: CreateProfessionalParams,
  ): Promise<Professional> {
    try {
      const professionalCreated = await this.professionalRepository.save({
        ...professional,
        clinicId,
      })

      return professionalCreated
    } catch (error) {
      throw new DatabaseError("Falha ao criar profissional!", error)
    }
  }

  async createProfessionalOnboarding(
    professional: CreateProfessionalOnboardingParams,
  ): Promise<Professional> {
    try {
      const professionalCreated = await this.professionalRepository.save({
        ...professional,
      })

      return professionalCreated
    } catch (error) {
      throw new DatabaseError("Falha ao criar profissional!", error)
    }
  }

  async getProfessionalsByClinicId(clinicId: string): Promise<Professional[]> {
    try {
      const professionals = await this.professionalRepository.find({
        where: {
          clinicId,
        },
        relations: ["user"],
      })

      return professionals
    } catch (error) {
      throw new DatabaseError("Falha ao buscar profissionais!", error)
    }
  }

  async getProfessionalByClinicId(
    clinicId: string,
    userId: string,
  ): Promise<Professional | null> {
    try {
      const professionals = await this.professionalRepository.findOne({
        where: {
          clinicId,
          userId,
        },
      })

      return professionals
    } catch (error) {
      throw new DatabaseError("Falha ao buscar profissionais!", error)
    }
  }

  async getCrmProfessionalByClinicId(
    clinicId: string,
    crmHash: string,
  ): Promise<Professional | null> {
    try {
      const professionals = await this.professionalRepository.findOne({
        where: {
          clinicId,
          crmHash,
        },
      })

      return professionals
    } catch (error) {
      throw new DatabaseError("Falha ao buscar profissionais!", error)
    }
  }

  async findById(professionalId: string): Promise<Professional | null> {
    try {
      const professional = await this.professionalRepository.findOne({
        where: { id: professionalId },
        relations: ["user"],
      })

      return professional
    } catch (error) {
      throw new DatabaseError("Falha ao buscar profissional!", error)
    }
  }

  async updateProfessional(
    professionalId: string,
    data: UpdateProfessionalParams,
  ): Promise<void> {
    try {
      await this.professionalRepository.update(professionalId, data)
    } catch (error) {
      throw new DatabaseError("Falha ao atualizar profissional!", error)
    }
  }

  async getCrmProfessionalByClinicIdExcluding(
    clinicId: string,
    crmHash: string,
    excludeId: string,
  ): Promise<Professional | null> {
    try {
      const professional = await this.professionalRepository.findOne({
        where: {
          clinicId,
          crmHash,
          id: Not(excludeId),
        },
      })

      return professional
    } catch (error) {
      throw new DatabaseError("Falha ao buscar profissionais!", error)
    }
  }
}

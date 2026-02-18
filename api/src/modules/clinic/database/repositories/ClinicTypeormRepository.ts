import { Not, Repository } from "typeorm";
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source";
import { Clinic } from "../../../../infra/database/typeorm/sass/entities/Clinic";
import { DatabaseError } from "../../../../shared/errors/database.error";
import { ClinicResponse } from "../../application/dtos/ClinicResponse";
import {
  ClinicCreateParams,
  ClinicUpdateParams,
} from "../../application/types";
import { ClinicRepositoryInterface } from "../interface/ClinicRepositoryInterface";

export class ClinicTypeormRepository implements ClinicRepositoryInterface {
  private clinicRepository: Repository<Clinic>;

  constructor() {
    this.clinicRepository = SassDataSource.getRepository(Clinic);
  }

  async createClinic(clinic: ClinicCreateParams): Promise<ClinicResponse> {
    try {
      const clinicCreated = await this.clinicRepository.save(clinic);
      return clinicCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar clínica!", error);
    }
  }

  async findByCnpj(
    clinicId: string | null,
    cnpj: string,
  ): Promise<ClinicResponse | null> {
    try {
      const clinic = await this.clinicRepository.findOne({
        where: {
          cnpj,
          id: clinicId ? Not(clinicId) : null,
        },
      });
      return clinic;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar clínica!", error);
    }
  }

  async findByPhone(
    clinicId: string | null,
    phone: string,
  ): Promise<ClinicResponse | null> {
    try {
      const clinic = await this.clinicRepository.findOne({
        where: {
          phone,
          id: clinicId ? Not(clinicId) : null,
        },
      });

      return clinic;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar clínica!", error);
    }
  }

  async findById(clinicId: string): Promise<ClinicResponse | null> {
    try {
      const clinic = await this.clinicRepository.findOne({
        where: {
          id: clinicId,
        },
      });
      return clinic;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar clínica!", error);
    }
  }

  async updateClinic(
    clinicId: string,
    data: ClinicUpdateParams,
  ): Promise<void> {
    try {
      await this.clinicRepository.update(clinicId, data);
    } catch (error) {
      throw new DatabaseError("Falha ao atualizar clínica!", error);
    }
  }
}

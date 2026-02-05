import { Not, Repository } from "typeorm";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { SassDataSource } from "../data-source";
import { Clinic } from "../entities/Clinic";
import { ClinicCreateParams, ClinicUpdateParams } from "../interfaces/clinic";
import { ClinicRepositoryInterface } from "./interfaces/clinic-repository.interface";

export class ClinicTypeormRepository implements ClinicRepositoryInterface {
  private clinicRepository: Repository<Clinic>;

  constructor() {
    this.clinicRepository = SassDataSource.getRepository(Clinic);
  }

  async createClinic(clinic: ClinicCreateParams): Promise<Clinic> {
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
  ): Promise<Clinic | null> {
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
  ): Promise<Clinic | null> {
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

  async findById(clinicId: string): Promise<Clinic | null> {
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

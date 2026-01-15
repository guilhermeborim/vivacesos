import { Repository } from "typeorm";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { SassDataSource } from "../data-source";
import { Clinic } from "../entities/Clinic";
import {
  ClinicRepositoryInterface,
  CreateClinicParams,
} from "./interfaces/clinic-repository.interface";

export class ClinicTypeormRepository implements ClinicRepositoryInterface {
  private clinicRepository: Repository<Clinic>;

  constructor() {
    this.clinicRepository = SassDataSource.getRepository(Clinic);
  }

  async createClinic(clinic: CreateClinicParams): Promise<Clinic> {
    try {
      const clinicCreated = await this.clinicRepository.save(clinic);
      return clinicCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar clínica!", error);
    }
  }

  async findByCnpj(cnpj: string): Promise<Clinic | null> {
    try {
      const clinic = await this.clinicRepository.findOne({
        where: {
          cnpj,
        },
      });
      return clinic;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar clínica!", error);
    }
  }

  async findByPhone(phone: string): Promise<Clinic | null> {
    try {
      const clinic = await this.clinicRepository.findOne({
        where: {
          phone,
        },
      });

      return clinic;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar clínica!", error);
    }
  }
}

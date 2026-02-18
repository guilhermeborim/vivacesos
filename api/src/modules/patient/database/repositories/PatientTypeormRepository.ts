import { Repository } from "typeorm";
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source";
import { Patient } from "../../../../infra/database/typeorm/sass/entities/Patient";
import { DatabaseError } from "../../../../shared/errors/database.error";
import { PatientResponse } from "../../application/dtos/PatientResponse";
import { CreatePatientParams } from "../../application/types";
import { PatientRepositoryInterface } from "../interface/PatientRepositoryInterface";

export class PatientTypeormRepository implements PatientRepositoryInterface {
  private patientRepository: Repository<Patient>;

  constructor() {
    this.patientRepository = SassDataSource.getRepository(Patient);
  }

  async createPatient(
    clinicId: string,
    patient: CreatePatientParams,
  ): Promise<void> {
    try {
      await this.patientRepository.save({
        ...patient,
        clinicId,
      });
    } catch (error) {
      throw new DatabaseError("Falha ao criar paciente!", error);
    }
  }

  async getPatientsByClinic(clinicId: string): Promise<PatientResponse[]> {
    try {
      const patientExist = await this.patientRepository.find({
        where: {
          clinicId,
        },
      });

      return patientExist;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar paciente!", error);
    }
  }

  async getPatientByCpfInClinic(
    cpfHash: string,
    clinicId: string,
  ): Promise<PatientResponse | null> {
    try {
      const patientExist = await this.patientRepository.findOne({
        where: {
          clinicId,
          cpfHash,
        },
      });

      return patientExist;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar paciente!", error);
    }
  }
}

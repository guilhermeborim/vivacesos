import { Repository } from "typeorm";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { SassDataSource } from "../data-source";
import { Patient } from "../entities/Patient";
import { CreatePatientParams } from "../interfaces/patient";
import { PatientRepositoryInterface } from "./interfaces/patient-repository.interface";

export class PatientTypeormRepository implements PatientRepositoryInterface {
  private patientRepository: Repository<Patient>;

  constructor() {
    this.patientRepository = SassDataSource.getRepository(Patient);
  }

  async createPatient(
    clinicId: string,
    patient: CreatePatientParams,
  ): Promise<Patient> {
    try {
      const patientCreated = await this.patientRepository.save({
        ...patient,
        clinicId,
      });

      return patientCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar paciente!", error);
    }
  }

  async getPatientsByClinic(clinicId: string): Promise<Patient[]> {
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
  ): Promise<Patient | null> {
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

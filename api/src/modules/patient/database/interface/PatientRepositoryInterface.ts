import { Patient } from "../../../../infra/database/typeorm/sass/entities/Patient";
import { CreatePatientParams } from "../../../../infra/database/typeorm/sass/interfaces/patient";

export interface PatientRepositoryInterface {
  createPatient(clinicId: string, data: CreatePatientParams): Promise<Patient>;
  getPatientsByClinic(clinicId: string): Promise<Patient[]>;
  getPatientByCpfInClinic(
    cpf: string,
    clinicId: string,
  ): Promise<Patient | null>;
}

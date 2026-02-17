import { Patient } from "../../entities/Patient";
import { CreatePatientParams } from "../../interfaces/patient";

export interface PatientRepositoryInterface {
  createPatient(clinicId: string, data: CreatePatientParams): Promise<Patient>;
  getPatientsByClinic(clinicId: string): Promise<Patient[]>;
  getPatientByCpfInClinic(
    cpf: string,
    clinicId: string,
  ): Promise<Patient | null>;
}

import { PatientResponse } from "../../application/dtos/PatientResponse";
import { CreatePatientParams } from "../../application/types";

export interface PatientRepositoryInterface {
  createPatient(clinicId: string, data: CreatePatientParams): Promise<void>;
  getPatientsByClinic(clinicId: string): Promise<PatientResponse[]>;
  getPatientByCpfInClinic(
    cpf: string,
    clinicId: string,
  ): Promise<PatientResponse | null>;
}

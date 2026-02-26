import { Patient } from "../../../../infra/database/typeorm/sass/entities/Patient"
import { CreatePatientParams } from "../../application/types"

export interface PatientRepositoryInterface {
  createPatient(clinicId: string, data: CreatePatientParams): Promise<void>
  getPatientsByClinic(clinicId: string): Promise<Patient[]>
  getPatientByCpfInClinic(cpf: string, clinicId: string): Promise<Patient | null>
  getPatientByEmailInClinic(email: string, clinicId: string): Promise<Patient | null>
  getPatientByPhoneInClinic(phone: string, clinicId: string): Promise<Patient | null>
}

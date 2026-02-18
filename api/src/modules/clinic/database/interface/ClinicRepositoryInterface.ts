import { Clinic } from "../../../../infra/database/typeorm/sass/entities/Clinic";
import {
  ClinicCreateParams,
  ClinicUpdateParams,
} from "../../application/types";

export interface ClinicRepositoryInterface {
  createClinic(data: ClinicCreateParams): Promise<Clinic>;
  updateClinic(clinicId: string, data: ClinicUpdateParams): Promise<void>;
  findByCnpj(clinicId: string | null, cnpj: string): Promise<Clinic | null>;
  findByPhone(clinicId: string | null, phone: string): Promise<Clinic | null>;
  findById(clinicId: string): Promise<Clinic | null>;
}

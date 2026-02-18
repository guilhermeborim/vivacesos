import { ClinicResponse } from "../../application/dtos/ClinicResponse";
import {
  ClinicCreateParams,
  ClinicUpdateParams,
} from "../../application/types";

export interface ClinicRepositoryInterface {
  createClinic(data: ClinicCreateParams): Promise<ClinicResponse>;
  updateClinic(clinicId: string, data: ClinicUpdateParams): Promise<void>;
  findByCnpj(
    clinicId: string | null,
    cnpj: string,
  ): Promise<ClinicResponse | null>;
  findByPhone(
    clinicId: string | null,
    phone: string,
  ): Promise<ClinicResponse | null>;
  findById(clinicId: string): Promise<ClinicResponse | null>;
}

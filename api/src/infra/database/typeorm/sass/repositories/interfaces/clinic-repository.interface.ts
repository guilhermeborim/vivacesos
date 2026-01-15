import { Clinic } from "../../entities/Clinic";

export interface CreateClinicParams {
  name: string;
  cnpj: string;
  phone: string;
  active?: boolean;
}

export interface ClinicRepositoryInterface {
  createClinic(data: CreateClinicParams): Promise<Clinic>;
  findByCnpj(cnpj: string): Promise<Clinic | null>;
  findByPhone(phone: string): Promise<Clinic | null>;
}

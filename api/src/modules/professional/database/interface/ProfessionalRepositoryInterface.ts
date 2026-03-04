import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional";
import {
  CreateProfessionalOnboardingParams,
  CreateProfessionalParams,
  UpdateProfessionalParams,
} from "../../application/types";

export interface ProfessionalRepositoryInterface {
  createProfessional(
    clinicId: string,
    data: CreateProfessionalParams,
  ): Promise<Professional>;
  createProfessionalOnboarding(
    data: CreateProfessionalOnboardingParams,
  ): Promise<Professional>;
  getProfessionalsByClinicId(clinicId: string): Promise<Professional[]>;
  getProfessionalByClinicId(
    clinicId: string,
    userId: string,
  ): Promise<Professional | null>;
  getCrmProfessionalByClinicId(
    clinicId: string,
    crmHash: string,
  ): Promise<Professional | null>;
  findById(professionalId: string): Promise<Professional | null>;
  updateProfessional(professionalId: string, data: UpdateProfessionalParams): Promise<void>;
  getCrmProfessionalByClinicIdExcluding(
    clinicId: string,
    crmHash: string,
    excludeId: string,
  ): Promise<Professional | null>;
}

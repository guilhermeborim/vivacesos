import { Professional, ProfessionalType } from "../../entities/Professional";

export interface CreateProfessionalParams {
  userId: string;
  type?: ProfessionalType;
  crm?: string;
  specialty?: string;
  active?: boolean;
}

export interface CreateProfessionalOnboardingParams extends CreateProfessionalParams {
  clinicId: string;
}

export interface ProfessionalRepositoryInterface {
  createProfessional(
    clinicId: string,
    data: CreateProfessionalParams,
  ): Promise<Professional>;
  createProfessionalOnboarding(
    data: CreateProfessionalOnboardingParams,
  ): Promise<Professional>;
  findProfessionalByClinicId(clinicId: string): Promise<Professional[]>;
}

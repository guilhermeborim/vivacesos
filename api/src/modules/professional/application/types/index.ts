import { ProfessionalType } from "../../../../infra/database/typeorm/sass/entities/Professional";

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

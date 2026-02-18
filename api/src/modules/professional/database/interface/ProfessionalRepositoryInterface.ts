import { Professional } from "../../../../infra/database/typeorm/sass/entities/Professional";
import {
  CreateProfessionalOnboardingParams,
  CreateProfessionalParams,
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
}

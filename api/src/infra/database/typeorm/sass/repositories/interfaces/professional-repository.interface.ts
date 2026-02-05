import { Professional } from "../../entities/Professional";
import {
  CreateProfessionalOnboardingParams,
  CreateProfessionalParams,
} from "../../interfaces/professional";

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

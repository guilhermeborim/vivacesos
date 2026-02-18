import { ProfessionalResponse } from "../../application/dtos/ProfessionalResponse";
import {
  CreateProfessionalOnboardingParams,
  CreateProfessionalParams,
} from "../../application/types";

export interface ProfessionalRepositoryInterface {
  createProfessional(
    clinicId: string,
    data: CreateProfessionalParams,
  ): Promise<ProfessionalResponse>;
  createProfessionalOnboarding(
    data: CreateProfessionalOnboardingParams,
  ): Promise<ProfessionalResponse>;
  getProfessionalsByClinicId(clinicId: string): Promise<ProfessionalResponse[]>;
}

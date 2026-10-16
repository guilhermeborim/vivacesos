import { api } from "@/core/api/shared/api_helper";
import * as url from "@/core/api/shared/url_helper";
import {
  CreateNextStepTypeSchema,
  CreateProfessionalOnboardingTypeSchema,
} from "../schemas";

export const postNextStep = (payload: CreateNextStepTypeSchema) =>
  api.post(url.POST_NEXT_STEP, payload);
export const postCreateProfessionalOnboarding = (
  payload: CreateProfessionalOnboardingTypeSchema,
) => api.post(url.POST_PROFESSIONAL_ONBOARDING, payload);

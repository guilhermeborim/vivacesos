import { api } from "core/api/shared/api_helper";
import * as url from "core/api/shared/url_helper";

export const postNextStep = (data: any) => api.post(url.POST_NEXT_STEP, data);
export const postCreateProfessionalOnboarding = (data: any) =>
  api.post(url.POST_PROFESSIONAL_ONBOARDING, data);

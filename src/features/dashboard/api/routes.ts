import { api } from "@/core/api/shared/api_helper";
import * as url from "@/core/api/shared/url_helper";
import { DashboardAnalytics, DashboardOverview } from "@/shared/types";
import {
  CreateNextStepTypeSchema,
  CreateProfessionalOnboardingTypeSchema,
} from "../schemas";

export const postNextStep = (payload: CreateNextStepTypeSchema) =>
  api.post(url.POST_NEXT_STEP, payload);
export const postCreateProfessionalOnboarding = (
  payload: CreateProfessionalOnboardingTypeSchema,
) => api.post(url.POST_PROFESSIONAL_ONBOARDING, payload);

export const getDashboard = (params: { month: string; tz: string }) =>
  api.get<DashboardOverview>(url.GET_DASHBOARD, { params });
export const getDashboardAnalytics = (params: { month: string; tz: string }) =>
  api.get<DashboardAnalytics>(url.GET_DASHBOARD_ANALYTICS, { params });

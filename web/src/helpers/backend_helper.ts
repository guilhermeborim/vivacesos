import { Session } from "features/auth/hooks/authContext";
import {
  LoginHttpParams,
  RegisterHttpParams,
} from "features/auth/interfaces/auth";
import { api } from "./api_helper";
import * as url from "./url_helper";

// Auth Method
export const postLogin = (data: LoginHttpParams) =>
  api.post(url.POST_LOGIN, data);
export const postRegister = (data: RegisterHttpParams) =>
  api.post(url.POST_REGISTER, data);
export const getSession = () => api.get<Session>(url.GET_SESSION);
export const postRefreshToken = () => api.post(url.POST_REFRESH_TOKEN);
export const postLogout = () => api.post(url.POST_LOGOUT);
export const postNextStep = (data: any) => api.post(url.POST_NEXT_STEP, data);

// Select Clinic Method
export const postSelectClinic = (clinicId: string) =>
  api.post(url.POST_SELECT_CLINIC, { clinicId });

// Clinic Method
export const postCreateClinic = (data: any) => api.post(url.POST_CLINIC, data);
export const getClinicById = (clinicId: string) =>
  api.get(url.GET_CLINIC_BY_ID.replace(":clinicId", clinicId));
export const putClinicById = (clinicId: string, data: any) =>
  api.put(url.PUT_CLINIC_BY_ID.replace(":clinicId", clinicId), data);

// Professional Method
export const postCreateProfessionalOnboarding = (data: any) =>
  api.post(url.POST_PROFESSIONAL_ONBOARDING, data);

// Clinic User Method
export const getClinicsByUser = () => api.get(url.GET_CLINICS_BY_USER);

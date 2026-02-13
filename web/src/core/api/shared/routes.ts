import { CreateClinicFormTypeSchema } from "@/features/clinic/schemas";
import { api } from "./api_helper";
import * as url from "./url_helper";

export const postSelectClinic = (clinicId: string) =>
  api.post(url.POST_SELECT_CLINIC, { clinicId });

export const postCreateClinic = (payload: CreateClinicFormTypeSchema) =>
  api.post(url.POST_CLINIC, payload);
export const postRefreshToken = () => api.post(url.POST_REFRESH_TOKEN);

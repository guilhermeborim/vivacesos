import { api } from "./api_helper";
import * as url from "./url_helper";

export const postSelectClinic = (clinicId: string) =>
  api.post(url.POST_SELECT_CLINIC, { clinicId });

export const postCreateClinic = (data: any) => api.post(url.POST_CLINIC, data);

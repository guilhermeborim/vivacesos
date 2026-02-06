import { api } from "core/api/shared/api_helper";
import * as url from "core/api/shared/url_helper";

export const getProfessionals = () => api.get(url.GET_PROFESSIONALS);
export const postCreateProfessional = (data: any) =>
  api.post(url.POST_PROFESSIONAL, data);

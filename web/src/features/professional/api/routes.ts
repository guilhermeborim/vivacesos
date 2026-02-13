import { api } from "core/api/shared/api_helper";
import * as url from "core/api/shared/url_helper";
import { Professional } from "shared/types";
import { CreateProfessionalTypeSchema } from "../schemas";

export const getProfessionals = () =>
  api.get<Professional[]>(url.GET_PROFESSIONALS);
export const postCreateProfessional = (payload: CreateProfessionalTypeSchema) =>
  api.post(url.POST_PROFESSIONAL, payload);

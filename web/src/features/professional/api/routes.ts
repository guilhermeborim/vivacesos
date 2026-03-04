import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import { Professional } from "@/shared/types"
import { CreateProfessionalTypeSchema, UpdateProfessionalTypeSchema } from "../schemas"

export const getProfessionals = () => api.get<Professional[]>(url.GET_PROFESSIONALS)
export const postCreateProfessional = (payload: CreateProfessionalTypeSchema) =>
  api.post(url.POST_PROFESSIONAL, payload)
export const getProfessionalById = (professionalId: string) =>
  api.get(url.GET_PROFESSIONAL_BY_ID.replace(":professionalId", professionalId))
export const putProfessionalById = (
  professionalId: string,
  payload: UpdateProfessionalTypeSchema,
) =>
  api.put(url.PUT_PROFESSIONAL_BY_ID.replace(":professionalId", professionalId), payload)

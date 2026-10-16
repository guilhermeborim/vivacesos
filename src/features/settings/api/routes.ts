import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import { ClinicSettings } from "@/shared/types"

export const getSettings = () => api.get<ClinicSettings>(url.GET_SETTINGS)

export const putSettings = (payload: Partial<ClinicSettings>) =>
  api.put<ClinicSettings>(url.PUT_SETTINGS, payload)

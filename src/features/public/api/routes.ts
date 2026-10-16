import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import { PublicAppointment } from "@/shared/types"

export const getPublicAppointment = (token: string) =>
  api.get<PublicAppointment>(url.GET_PUBLIC_APPOINTMENT.replace(":token", token))

export const postPublicConfirm = (token: string) =>
  api.post<PublicAppointment>(url.POST_PUBLIC_APPOINTMENT_CONFIRM.replace(":token", token))

export const postPublicCancel = (token: string) =>
  api.post<PublicAppointment>(url.POST_PUBLIC_APPOINTMENT_CANCEL.replace(":token", token))

import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import {
  AppointmentMessage,
  GoogleProfessional,
  GoogleStatus,
  IntegrationsOverview,
} from "@/shared/types"

export const getIntegrations = () => api.get<IntegrationsOverview>(url.GET_INTEGRATIONS)

export const postAppointmentMessage = (appointmentId: string) =>
  api.post<AppointmentMessage>(
    url.POST_APPOINTMENT_MESSAGE.replace(":appointmentId", appointmentId),
  )

export const getGoogleStatus = () => api.get<GoogleStatus>(url.GET_GOOGLE_STATUS)
export const getGoogleAuthUrl = () => api.get<{ url: string }>(url.GET_GOOGLE_AUTH_URL)
export const postGoogleDisconnect = () => api.post(url.POST_GOOGLE_DISCONNECT)
export const postGoogleSyncAll = () =>
  api.post<{ processed: number; synced: number }>(url.POST_GOOGLE_SYNC_ALL)
export const getGoogleProfessionals = () =>
  api.get<GoogleProfessional[]>(url.GET_GOOGLE_PROFESSIONALS)
export const postGoogleProfessionalCalendar = (professionalId: string) =>
  api.post(url.POST_GOOGLE_PROFESSIONAL_CALENDAR.replace(":professionalId", professionalId))

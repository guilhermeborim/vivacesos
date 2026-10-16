import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import { Appointment, AppointmentSlots } from "@/shared/types"
import {
  CreateAppointmentTypeSchema,
  UpdateAppointmentStatusPayload,
  UpdateAppointmentTypeSchema,
} from "../schemas"
import { toIso } from "../utils"

export const getAppointments = () => api.get<Appointment[]>(url.GET_APPOINTMENTS)
export const getAppointmentById = (appointmentId: string) =>
  api.get<Appointment>(url.GET_APPOINTMENT_BY_ID.replace(":appointmentId", appointmentId))

export const postAppointment = (payload: CreateAppointmentTypeSchema) =>
  api.post(url.POST_APPOINTMENT, {
    ...payload,
    startsAt: toIso(payload.startsAt),
    endsAt: toIso(payload.endsAt),
    notes: payload.notes || undefined,
  })

export const putAppointmentById = (
  appointmentId: string,
  payload: UpdateAppointmentTypeSchema,
) =>
  api.put(url.PUT_APPOINTMENT_BY_ID.replace(":appointmentId", appointmentId), {
    startsAt: payload.startsAt ? toIso(payload.startsAt) : undefined,
    endsAt: payload.endsAt ? toIso(payload.endsAt) : undefined,
    price: payload.price,
    notes: payload.notes === undefined ? undefined : payload.notes || null,
  })

export const patchAppointmentStatus = (
  appointmentId: string,
  payload: UpdateAppointmentStatusPayload,
) =>
  api.patch(url.PATCH_APPOINTMENT_STATUS.replace(":appointmentId", appointmentId), payload)

export const patchAppointmentPayment = (
  appointmentId: string,
  payload: { paid: boolean; paymentMethod?: string },
) =>
  api.patch(url.PATCH_APPOINTMENT_PAYMENT.replace(":appointmentId", appointmentId), payload)

export const getSlots = (params: { professionalId: string; date: string }) =>
  api.get<AppointmentSlots>(url.GET_APPOINTMENT_SLOTS, { params })

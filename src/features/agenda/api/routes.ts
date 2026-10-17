import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"

export interface AgendaBookingPayload {
  patientId: string
  professionalId: string
  /** ISO do início; o fim vem da duração padrão do profissional. */
  startsAt: string
  price: number
  notes?: string
}

export const postAgendaBooking = (payload: AgendaBookingPayload) =>
  api.post(url.POST_APPOINTMENT, { ...payload, notes: payload.notes || undefined })

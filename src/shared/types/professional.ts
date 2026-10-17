import { Type } from "../enums"
import type { Appointment } from "./appointment"

export type Professional = {
  clinicId: string
  userId: string
  professional: {
    name: string
    specialty: string
    type: Type
    active: boolean
    crm: string
    professionalId: string
    /** Percentual padrão do repasse; só vem para o ADMIN e para o próprio profissional. */
    payoutPercent?: number | null
    /** Duração padrão da consulta, em minutos (de 5 em 5). */
    appointmentDurationMinutes: number
  }
}

/** Horas de 1 h marcadas por dia da semana (0 = domingo … 6 = sábado). */
export type AvailabilityDay = { weekday: number; hours: number[] }

export type Availability = {
  professionalId: string
  /** false = atende em qualquer horário. */
  restricted: boolean
  days: AvailabilityDay[]
}

export type AppointmentAgenda = {
  durationMinutes: number
  restricted: boolean
  /** Grade do dia: um horário por consulta, só dentro do atendimento do profissional. */
  slots: AppointmentSlot[]
  /** Consultas que ocupam o dia (em aberto e concluídas). */
  appointments: Appointment["appointment"][]
}
export type AppointmentAgendaDays = { days: { date: string; available: boolean }[] }

export type AppointmentSlot = { startsAt: string; endsAt: string }
export type AppointmentSlots = {
  restricted: boolean
  durationMinutes: number
  slots: AppointmentSlot[]
}

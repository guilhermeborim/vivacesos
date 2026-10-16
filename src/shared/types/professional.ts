import { Type } from "../enums"

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

export type AppointmentSlot = { startsAt: string; endsAt: string }
export type AppointmentSlots = { restricted: boolean; slots: AppointmentSlot[] }

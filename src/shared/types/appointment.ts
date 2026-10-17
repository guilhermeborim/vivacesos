import { AppointmentStatus, PaymentMethod } from "../enums"

export type Appointment = {
  clinicId: string
  appointment: {
    appointmentId: string
    startsAt: string
    endsAt: string
    status: AppointmentStatus
    arrivedAt: string | null
    /** Só vem na agenda do dia: a consulta já tem triagem registrada. */
    hasTriage?: boolean
    notes: string | null
    price: number
    paid: boolean
    paidAt: string | null
    paymentMethod: PaymentMethod | null
    payoutId: string | null
    patient: { patientId: string; name: string }
    professional: { professionalId: string; name: string | null; specialty: string }
  }
}

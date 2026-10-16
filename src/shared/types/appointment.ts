import { AppointmentStatus, PaymentMethod } from "../enums"

export type Appointment = {
  clinicId: string
  appointment: {
    appointmentId: string
    startsAt: string
    endsAt: string
    status: AppointmentStatus
    notes: string | null
    price: number
    paid: boolean
    paidAt: string | null
    paymentMethod: PaymentMethod | null
    patient: { patientId: string; name: string }
    professional: { professionalId: string; name: string | null; specialty: string }
  }
}

import { AppointmentStatus, PaymentMethod } from "../enums"

export type RevenueTotals = { total: number; received: number; receivable: number }
export type ExpenseTotals = { paid: number; pending: number }

export type Revenue = {
  appointmentId: string
  startsAt: string
  endsAt: string
  status: AppointmentStatus
  price: number
  paid: boolean
  paidAt: string | null
  paymentMethod: PaymentMethod | null
  patient: { patientId: string; name: string }
  professional: { professionalId: string; name: string | null }
}

export type Expense = {
  expenseId: string
  description: string
  category: string | null
  amount: number
  dueDate: string
  paid: boolean
  paidAt: string | null
  paymentMethod: PaymentMethod | null
  notes: string | null
}

export type FinanceSummary = {
  revenues: RevenueTotals
  expenses?: ExpenseTotals
  balance?: number
}

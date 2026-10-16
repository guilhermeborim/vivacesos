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
  /** Repasse em que a consulta foi incluída (trava valor e pagamento). */
  payoutId: string | null
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
  /** Preenchido quando a despesa é um repasse a profissional. */
  payoutId: string | null
  /** Só o modelo da recorrência é diferente de NONE. */
  recurrence: ExpenseRecurrence
  recurrenceEndsAt: string | null
  recurrenceNextDate: string | null
  /** Despesa criada automaticamente pela recorrência. */
  isRecurrenceOccurrence: boolean
}

export type ExpenseRecurrence = "NONE" | "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY"

export type ClinicSettings = { recurringExpensesEnabled: boolean }

export type PayoutPreview = {
  professionalId: string
  cutoffAt: string
  percent: number | null
  eligibleCount: number
  grossAmount: number
  amount: number | null
}

export type PayoutItem = {
  payoutId: string
  professionalId: string
  professionalName: string | null
  percent: number
  grossAmount: number
  amount: number
  cutoffAt: string
  createdAt: string
  expenseId: string
  paid: boolean
  paidAt: string | null
  dueDate: string
}

export type FinanceSummary = {
  revenues: RevenueTotals
  expenses?: ExpenseTotals
  balance?: number
}

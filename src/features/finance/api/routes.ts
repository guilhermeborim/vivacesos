import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import {
  Expense,
  ExpenseTotals,
  FinanceSummary,
  PayoutItem,
  PayoutPreview,
  Revenue,
  RevenueTotals,
} from "@/shared/types"
import { ExpenseTypeSchema } from "../schemas"

type Period = {
  from?: string
  to?: string
  dateField: "startsAt" | "paidAt"
  professionalId?: string
}
type PaymentPayload = { paid: boolean; paymentMethod?: string }

export const getRevenues = (params: Period & { paid?: boolean }) =>
  api.get<{ totals: RevenueTotals; revenues: Revenue[] }>(url.GET_REVENUES, { params })

export const getFinanceSummary = (params: Period) =>
  api.get<FinanceSummary>(url.GET_FINANCE_SUMMARY, { params })

export const getExpenses = (params: Period & { paid?: boolean }) =>
  api.get<{ totals: ExpenseTotals; expenses: Expense[] }>(url.GET_EXPENSES, { params })

export const postExpense = (payload: ExpenseTypeSchema) =>
  api.post(url.POST_EXPENSE, normalizeExpense(payload))

export const putExpenseById = (expenseId: string, payload: ExpenseTypeSchema) =>
  api.put(url.PUT_EXPENSE_BY_ID.replace(":expenseId", expenseId), {
    ...payload,
    // A recorrência só é definida no cadastro.
    recurrence: undefined,
    recurrenceEndsAt: undefined,
    category: payload.category || null,
    notes: payload.notes || null,
  })

export const patchExpensePayment = (expenseId: string, payload: PaymentPayload) =>
  api.patch(url.PATCH_EXPENSE_PAYMENT.replace(":expenseId", expenseId), payload)

export const deleteExpenseById = (expenseId: string) =>
  api.delete(url.DELETE_EXPENSE_BY_ID.replace(":expenseId", expenseId))

function normalizeExpense(payload: ExpenseTypeSchema) {
  const { recurrence, recurrenceEndsAt, ...rest } = payload
  return {
    ...rest,
    category: payload.category || undefined,
    notes: payload.notes || undefined,
    // Só envia recorrência quando escolhida (o campo some com a opção desligada).
    ...(recurrence &&
      recurrence !== "NONE" && {
        recurrence,
        recurrenceEndsAt: recurrenceEndsAt || undefined,
      }),
  }
}

export const getPayoutPreview = (params: { professionalId: string; percent?: number }) =>
  api.get<PayoutPreview>(url.GET_PAYOUT_PREVIEW, { params })

export const postPayout = (payload: { professionalId: string; percent?: number }) =>
  api.post<{ payoutId: string; amount: number; grossAmount: number; count: number }>(
    url.POST_PAYOUT,
    payload,
  )

export const getPayouts = (params: { professionalId?: string }) =>
  api.get<PayoutItem[]>(url.GET_PAYOUTS, { params })

export const deletePayoutById = (payoutId: string) =>
  api.delete(url.DELETE_PAYOUT_BY_ID.replace(":payoutId", payoutId))

export const postStopExpenseRecurrence = (expenseId: string) =>
  api.post(url.POST_STOP_EXPENSE_RECURRENCE.replace(":expenseId", expenseId))

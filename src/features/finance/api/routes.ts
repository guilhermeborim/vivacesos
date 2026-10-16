import { api } from "@/core/api/shared/api_helper"
import * as url from "@/core/api/shared/url_helper"
import {
  Expense,
  ExpenseTotals,
  FinanceSummary,
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
    category: payload.category || null,
    notes: payload.notes || null,
  })

export const patchExpensePayment = (expenseId: string, payload: PaymentPayload) =>
  api.patch(url.PATCH_EXPENSE_PAYMENT.replace(":expenseId", expenseId), payload)

export const deleteExpenseById = (expenseId: string) =>
  api.delete(url.DELETE_EXPENSE_BY_ID.replace(":expenseId", expenseId))

function normalizeExpense(payload: ExpenseTypeSchema) {
  return {
    ...payload,
    category: payload.category || undefined,
    notes: payload.notes || undefined,
  }
}

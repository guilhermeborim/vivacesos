import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { ExpenseTypeSchema } from "../schemas"
import {
  deleteExpenseById,
  deletePayoutById,
  patchExpensePayment,
  postExpense,
  postStopExpenseRecurrence,
  postPayout,
  putExpenseById,
} from "./routes"

const onError = (fallback: string) => (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data.message || fallback)
  }
}

const useInvalidate = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ["expenses"] })
    queryClient.invalidateQueries({ queryKey: ["summary"] })
    queryClient.invalidateQueries({ queryKey: ["payouts"] })
  }
}

export const useMutationExpense = () => {
  const invalidate = useInvalidate()

  return useMutation({
    mutationFn: (payload: ExpenseTypeSchema) => postExpense(payload),
    onSuccess: () => {
      invalidate()
      toast.success("Despesa cadastrada com sucesso!")
    },
    onError: onError("Erro ao cadastrar despesa"),
  })
}

export const useMutationUpdateExpense = (expenseId: string) => {
  const invalidate = useInvalidate()

  return useMutation({
    mutationFn: (payload: ExpenseTypeSchema) => putExpenseById(expenseId, payload),
    onSuccess: () => {
      invalidate()
      toast.success("Despesa atualizada com sucesso!")
    },
    onError: onError("Erro ao atualizar despesa"),
  })
}

export const useMutationExpensePayment = (expenseId: string) => {
  const invalidate = useInvalidate()

  return useMutation({
    mutationFn: (payload: { paid: boolean; paymentMethod?: string }) =>
      patchExpensePayment(expenseId, payload),
    onSuccess: () => {
      invalidate()
      toast.success("Pagamento da despesa atualizado!")
    },
    onError: onError("Erro ao atualizar pagamento"),
  })
}

export const useMutationDeleteExpense = (expenseId: string) => {
  const invalidate = useInvalidate()

  return useMutation({
    mutationFn: () => deleteExpenseById(expenseId),
    onSuccess: () => {
      invalidate()
      toast.success("Despesa removida com sucesso!")
    },
    onError: onError("Erro ao remover despesa"),
  })
}

/** Lançar ou desfazer um repasse muda receitas (marca “repassada”), despesas e dashboard. */
const useInvalidatePayout = () => {
  const queryClient = useQueryClient()
  return () => {
    for (const key of [
      "payout-preview",
      "payouts",
      "revenues",
      "expenses",
      "summary",
      "appointments",
      "dashboard",
      "dashboard-analytics",
    ]) {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  }
}

export const useMutationPayout = () => {
  const invalidate = useInvalidatePayout()

  return useMutation({
    mutationFn: (payload: { professionalId: string; percent?: number }) => postPayout(payload),
    onSuccess: () => {
      invalidate()
      toast.success("Repasse lançado! A despesa foi criada em Despesas.")
    },
    onError: onError("Erro ao lançar repasse"),
  })
}

export const useMutationDeletePayout = () => {
  const invalidate = useInvalidatePayout()

  return useMutation({
    mutationFn: (payoutId: string) => deletePayoutById(payoutId),
    onSuccess: () => {
      invalidate()
      toast.success("Repasse desfeito!")
    },
    onError: onError("Erro ao desfazer repasse"),
  })
}

export const useMutationStopRecurrence = () => {
  const invalidate = useInvalidate()

  return useMutation({
    mutationFn: (expenseId: string) => postStopExpenseRecurrence(expenseId),
    onSuccess: () => {
      invalidate()
      toast.success("Recorrência encerrada!")
    },
    onError: onError("Erro ao encerrar recorrência"),
  })
}

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { ExpenseTypeSchema } from "../schemas"
import {
  deleteExpenseById,
  patchExpensePayment,
  postExpense,
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

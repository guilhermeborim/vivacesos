import z from "zod"
import { PaymentMethod } from "@/shared/enums"

export const paymentSchema = z
  .object({
    paid: z.boolean(),
    paymentMethod: z.enum(PaymentMethod, "Selecione a forma de pagamento").optional().nullable(),
  })
  .refine((v) => !v.paid || !!v.paymentMethod, {
    message: "Selecione a forma de pagamento",
    path: ["paymentMethod"],
  })

export type PaymentTypeSchema = z.infer<typeof paymentSchema>

export const expenseSchema = z.object({
  description: z
    .string("A descrição é obrigatória")
    .trim()
    .min(1, "A descrição é obrigatória")
    .max(255, "A descrição deve ter no máximo 255 caracteres"),
  category: z.string().trim().max(100, "A categoria deve ter no máximo 100 caracteres").optional().nullable(),
  amount: z
    .number("O valor é obrigatório")
    .positive("O valor deve ser maior que zero")
    .max(99999999.99, "Valor muito alto"),
  dueDate: z.iso.date("O vencimento é obrigatório"),
  notes: z.string().max(2000, "As observações devem ter no máximo 2000 caracteres").optional().nullable(),
  /** Só no cadastro e com a opção ligada em Configurações. */
  recurrence: z.enum(["NONE", "DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"]).optional(),
  recurrenceEndsAt: z.string().optional().nullable(),
})

export type ExpenseTypeSchema = z.infer<typeof expenseSchema>

export type FinanceFilters = {
  from: string
  to: string
  paid: "" | "true" | "false"
  dateField: "startsAt" | "paidAt"
  professionalId: string
}

import z from "zod"
import { AppointmentStatus } from "@/shared/enums"

const price = z
  .number("O valor é obrigatório")
  .min(0, "O valor não pode ser negativo")
  .max(99999999.99, "Valor muito alto")

const endAfterStart = (v: { startsAt?: string; endsAt?: string }) =>
  !v.startsAt || !v.endsAt || new Date(v.endsAt) > new Date(v.startsAt)

const endAfterStartError = {
  message: "O fim deve ser depois do início",
  path: ["endsAt"],
}

export const createAppointmentSchema = z
  .object({
    patientId: z.uuid("O paciente é obrigatório"),
    professionalId: z.uuid("O profissional é obrigatório"),
    startsAt: z.string("O início é obrigatório").min(1, "O início é obrigatório"),
    endsAt: z.string("O fim é obrigatório").min(1, "O fim é obrigatório"),
    price,
    notes: z.string().max(2000, "As observações devem ter no máximo 2000 caracteres").optional(),
  })
  .refine(endAfterStart, endAfterStartError)

export type CreateAppointmentTypeSchema = z.infer<typeof createAppointmentSchema>

export const updateAppointmentSchema = z
  .object({
    startsAt: z.string().min(1, "O início é obrigatório").optional(),
    endsAt: z.string().min(1, "O fim é obrigatório").optional(),
    price: price.optional(),
    notes: z
      .string()
      .max(2000, "As observações devem ter no máximo 2000 caracteres")
      .nullable()
      .optional(),
  })
  .refine(endAfterStart, endAfterStartError)

export type UpdateAppointmentTypeSchema = z.infer<typeof updateAppointmentSchema>

export type UpdateAppointmentStatusPayload = { status: AppointmentStatus }

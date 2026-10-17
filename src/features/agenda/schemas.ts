import z from "zod"

export const agendaBookingSchema = z.object({
  patientId: z.uuid("O paciente é obrigatório"),
  price: z.number("O valor é obrigatório").min(0, "O valor não pode ser negativo").max(99999999.99),
  notes: z.string().max(2000, "As observações devem ter no máximo 2000 caracteres").optional(),
})

export type AgendaBookingTypeSchema = z.infer<typeof agendaBookingSchema>

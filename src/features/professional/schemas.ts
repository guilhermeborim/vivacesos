import z from "zod"

export const createProfessionalSchema = z.object({
  userId: z.uuid("ID do usuário inválido"),
  type: z.enum(["MEDICO"]).optional(),
  crm: z
    .string()
    .min(5, "O CRM deve ter no mínimo 5 caracteres")
    .max(10, "O CRM deve ter no máximo 10 caracteres"),
  specialty: z.string().max(30, "A especialidade deve ter no máximo 30 caracteres"),
  active: z.boolean().optional(),
})

export type CreateProfessionalTypeSchema = z.infer<typeof createProfessionalSchema>

export const updateProfessionalSchema = createProfessionalSchema
  .omit({ userId: true })
  .partial()
  .extend({
    // Vazio = sem percentual configurado; ausente = não altera (quem não é ADMIN nem vê o campo).
    payoutPercent: z
      .preprocess(
        (v) => (v === undefined ? undefined : v === "" || v === null ? null : Number(v)),
        z
          .number("O percentual deve ser um número")
          .min(0, "O percentual não pode ser negativo")
          .max(100, "O percentual deve ser no máximo 100")
          .nullable(),
      )
      .optional(),
    appointmentDurationMinutes: z
      .preprocess(
        (v) => (v === undefined || v === "" || v === null ? undefined : Number(v)),
        z
          .number("A duração deve ser um número")
          .int("A duração deve ser inteira")
          .min(5, "A duração mínima é de 5 minutos")
          .max(240, "A duração máxima é de 240 minutos")
          .multipleOf(5, "A duração deve ser múltipla de 5 minutos"),
      )
      .optional(),
  })

export type UpdateProfessionalTypeSchema = z.infer<typeof updateProfessionalSchema>

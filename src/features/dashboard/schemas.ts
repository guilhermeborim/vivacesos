import z from "zod"

export const createProfessionalOnboardingSchema = z.object({
  userId: z.uuid("ID do usuário inválido"),
  clinicId: z.uuid("ID da clínica inválido"),
  type: z.enum(["MEDICO"]).optional(),
  crm: z
    .string()
    .min(5, "O CRM deve ter no mínimo 5 caracteres")
    .max(10, "O CRM deve ter no máximo 10 caracteres"),
  specialty: z.string().max(30, "A especialidade deve ter no máximo 30 caracteres"),
  active: z.boolean().optional(),
})

export type CreateProfessionalOnboardingTypeSchema = z.infer<
  typeof createProfessionalOnboardingSchema
>

export const createNextStepSchema = z.object({
  step: z.enum(["CREATE_CLINIC", "LINK_PROFESSIONAL", "DONE", "FINISHED"]),
})

export type CreateNextStepTypeSchema = z.infer<typeof createNextStepSchema>

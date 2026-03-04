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

export const updateProfessionalSchema = z.object({
  type: z.enum(["MEDICO"]).optional(),
  crm: z
    .string()
    .min(5, "O CRM deve ter no mínimo 5 caracteres")
    .max(10, "O CRM deve ter no máximo 10 caracteres")
    .optional(),
  specialty: z
    .string()
    .max(30, "A especialidade deve ter no máximo 30 caracteres")
    .optional(),
  active: z.boolean().optional(),
})

export type UpdateProfessionalTypeSchema = z.infer<typeof updateProfessionalSchema>

export const inactiveProfessionalSchema = z.object({
  active: z.boolean(),
})

export type InactiveProfessionalTypeSchema = z.infer<typeof inactiveProfessionalSchema>

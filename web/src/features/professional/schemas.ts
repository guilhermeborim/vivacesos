import z from "zod";

export const createProfessionalBodySchema = z.object({
  userId: z.uuid("ID do usuário inválido"),
  type: z.enum(["MEDICO"]).optional(),
  crm: z
    .string({ error: "Campo obrigatório!" })
    .min(14, "O CRM deve ter no mínimo 14 caracteres"),
  specialty: z
    .string({ error: "Campo obrigatório!" })
    .min(10, "A especialidade deve ter no mínimo 10 caracteres")
    .max(20, "A especialidade deve ter no máximo 20 caracteres"),
  active: z.boolean().optional(),
});

export type CreateProfessionalBodySchema = z.infer<
  typeof createProfessionalBodySchema
>;

export const createProfessionalOnboardingBodySchema = z.object({
  userId: z.uuid("ID do usuário inválido"),
  clinicId: z.uuid("ID da clínica inválido"),
  type: z.enum(["MEDICO"]).optional(),
  crm: z
    .string({ error: "Campo obrigatório!" })
    .min(14, "O CRM deve ter no mínimo 14 caracteres"),
  specialty: z
    .string({ error: "Campo obrigatório!" })
    .min(10, "A especialidade deve ter no mínimo 10 caracteres")
    .max(20, "A especialidade deve ter no máximo 20 caracteres"),
  active: z.boolean().optional(),
});

export type CreateProfessionalOnboardingBodySchema = z.infer<
  typeof createProfessionalOnboardingBodySchema
>;

import z from "zod";

export const createProfessionalOnboardingSchema = z.object({
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

export type CreateProfessionalOnboardingTypeSchema = z.infer<
  typeof createProfessionalOnboardingSchema
>;

export const createNextStepSchema = z.object({
  step: z.enum(["CREATE_CLINIC", "LINK_PROFESSIONAL", "DONE", "FINISHED"]),
});

export type CreateNextStepTypeSchema = z.infer<typeof createNextStepSchema>;

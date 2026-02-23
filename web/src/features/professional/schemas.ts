import z from "zod";

export const createProfessionalSchema = z.object({
  userId: z.uuid("ID do usuário inválido"),
  type: z.enum(["MEDICO"]).optional(),
  crm: z
    .string({ error: "Campo obrigatório!" })
    .min(5, "O CRM deve ter no mínimo 5 caracteres")
    .max(10, "O CRM deve ter no máximo 10 caracteres"),
  specialty: z
    .string({ error: "Campo obrigatório!" })
    .min(10, "A especialidade deve ter no mínimo 10 caracteres")
    .max(20, "A especialidade deve ter no máximo 20 caracteres"),
  active: z.boolean().optional(),
});

export type CreateProfessionalTypeSchema = z.infer<
  typeof createProfessionalSchema
>;

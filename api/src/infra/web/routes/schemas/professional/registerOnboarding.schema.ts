import z from "zod";
import { ProfessionalType } from "../../../../database/typeorm/sass/entities/Professional";

export const registerProfessionalOnboardingBodySchema = z.object({
  userId: z.uuid("ID do usuário inválido"),
  clinicId: z.uuid("ID do usuário inválido"),
  type: z.enum(ProfessionalType).optional(),
  crm: z
    .string()
    .min(5, "O CRM deve ter no mínimo 5 caracteres")
    .max(10, "O CRM deve ter no máximo 10 caracteres")
    .optional(),
  specialty: z
    .string()
    .min(10, "A especialidade deve ter no mínimo 10 caracteres")
    .max(20, "A especialidade deve ter no máximo 20 caracteres")
    .optional(),
  active: z.boolean().optional(),
});

export type RegisterProfessionalOnboardingBodySchema = z.infer<
  typeof registerProfessionalOnboardingBodySchema
>;

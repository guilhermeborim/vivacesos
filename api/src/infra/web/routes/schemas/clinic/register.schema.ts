import z from "zod";

export const registerClinicBodySchema = z.object({
  name: z.string("O nome é obrigatório").min(1, "O nome é obrigatório"),
  cnpj: z
    .string("O CNPJ é obrigatório")
    .min(14, "O CNPJ deve ter no mínimo 14 caracteres"),
  phone: z
    .string("O telefone é obrigatório")
    .min(10, "O telefone deve ter no mínimo 10 caracteres")
    .max(20, "O telefone deve ter no máximo 20 caracteres"),
  active: z.boolean().optional(),
});

export type RegisterClinicBodySchema = z.infer<typeof registerClinicBodySchema>;

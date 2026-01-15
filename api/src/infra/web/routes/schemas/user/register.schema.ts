import z from "zod";

export const registerBodySchema = z.object({
  name: z.string("O nome é obrigatório").min(1, "O nome é obrigatório"),
  email: z.string("O email é obrigatório").email("O email deve ser válido"),
  password: z
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  active: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
});

export type RegisterBodySchema = z.infer<typeof registerBodySchema>;

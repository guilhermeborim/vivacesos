import z from "zod";

export const authenticateBodySchema = z.object({
  email: z.string("O email é obrigatório").email("O email deve ser válido"),
  password: z
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

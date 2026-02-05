import { z } from "zod";

export const inviteFormSchema = z.object({
  name: z.string({ error: "Campo Obrigatório" }),
  email: z.email({ error: "Campo Obrigatório" }),
  password: z
    .string({ error: "Campo Obrigatório" })
    .min(6, { error: "Mínimo de 6 Caracteres" }),
});

export type InviteFormSchema = z.infer<typeof inviteFormSchema>;

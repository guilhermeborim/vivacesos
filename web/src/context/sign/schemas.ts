import { z } from "zod";

export const signFormSchema = z.object({
  email: z.email({ error: "Campo Obrigatório" }),
  password: z
    .string({ error: "Campo Obrigatório" })
    .min(6, { error: "Mínimo de 6 Caracteres" }),
});

export type SignFormSchema = z.infer<typeof signFormSchema>;

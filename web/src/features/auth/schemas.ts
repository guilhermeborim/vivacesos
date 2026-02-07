import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "Campo Obrigatório" }),
  password: z
    .string({ error: "Campo Obrigatório" })
    .min(6, { error: "Mínimo de 6 Caracteres" }),
});

export type LoginFormTypeSchema = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  name: z.string({ error: "Campo Obrigatório" }),
  email: z.email({ error: "Campo Obrigatório" }),
  password: z
    .string({ error: "Campo Obrigatório" })
    .min(6, { error: "Mínimo de 6 Caracteres" }),
});

export type RegisterFormTypeSchema = z.infer<typeof registerFormSchema>;

export const selectClinicFormSchema = z.object({
  clinicId: z.string({ error: "Campo Obrigatório" }),
});

export type SelectClinicFormTypeSchema = z.infer<typeof selectClinicFormSchema>;

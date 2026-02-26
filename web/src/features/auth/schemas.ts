import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.email("O email deve ser válido"),
  password: z
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type LoginFormTypeSchema = z.infer<typeof loginFormSchema>

export const registerFormSchema = z.object({
  name: z.string("Campo Obrigatório"),
  email: z.email("O email deve ser válido"),
  password: z
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type RegisterFormTypeSchema = z.infer<typeof registerFormSchema>

export const selectClinicFormSchema = z.object({
  clinicId: z.string("Campo Obrigatório"),
})

export type SelectClinicFormTypeSchema = z.infer<typeof selectClinicFormSchema>

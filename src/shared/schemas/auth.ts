import z from "zod"

export const registerFormSchema = z.object({
  name: z.string("Campo Obrigatório"),
  email: z.email("O email deve ser válido"),
  password: z
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type RegisterFormTypeSchema = z.infer<typeof registerFormSchema>

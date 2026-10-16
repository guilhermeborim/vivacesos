import z from "zod"

export const registerFormSchema = z.object({
  name: z.string("Campo Obrigatório"),
  email: z.email("O email deve ser válido"),
  password: z
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  /** Token do link de convite; comprova que o e-mail foi convidado. */
  inviteToken: z.string().optional(),
  /** Perfil de profissional criado junto com o cadastro do convite. */
  professional: z
    .object({
      type: z.enum(["MEDICO"]).optional(),
      crm: z.string(),
      specialty: z.string(),
    })
    .optional(),
})

export type RegisterFormTypeSchema = z.infer<typeof registerFormSchema>

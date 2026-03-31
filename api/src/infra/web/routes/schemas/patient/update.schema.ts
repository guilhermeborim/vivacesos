import z from "zod"

export const updatePatientBodySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").optional(),
  email: z.email().optional(),
  cpf: z
    .string()
    .min(11, "O CPF deve conter 11 caracteres")
    .max(14, "O CPF deve conter 14 caracteres")
    .optional(),
  phone: z
    .string()
    .min(11, "O Telefone deve ter no mínimo 11 caracteres")
    .max(15, "O Telefone deve ter no máximo 15 caracteres")
    .optional(),
  birthDate: z.iso.date().optional(),
  active: z.boolean().optional(),
})

export type UpdatePatientBodySchema = z.infer<typeof updatePatientBodySchema>

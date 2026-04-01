import z from "zod"

export const createPatientTypeSchema = z.object({
  name: z.string("O nome é obrigatório").min(1, "O nome é obrigatório"),
  email: z.email("O email deve ser válido"),
  cpf: z
    .string("O CPF é obrigatório")
    .min(11, "O CPF deve conter 11 caracteres")
    .max(14, "O CPF deve conter 14 caracteres"),
  phone: z
    .string("O Telefone é obrigatório")
    .min(11, "O Telefone deve ter no mínimo 11 caracteres")
    .max(15, "O Telefone deve ter no máximo 15 caracteres"),
  birthDate: z.iso.date("A data de aniversário é obrigatória"),
  active: z.boolean().optional(),
})

export type CreatePatientTypeSchema = z.infer<typeof createPatientTypeSchema>

export const updatePatientSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").optional(),
  email: z.email("O email deve ser válido").optional(),
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
  birthDate: z.iso.date("A data de aniversário é obrigatória").optional(),
  active: z.boolean().optional(),
})

export type UpdatePatientTypeSchema = z.infer<typeof updatePatientSchema>

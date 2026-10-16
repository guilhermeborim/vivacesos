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

export const updatePatientSchema = createPatientTypeSchema.partial()

export type UpdatePatientTypeSchema = z.infer<typeof updatePatientSchema>

import z from "zod";

export const createPatientTypeSchema = z.object({
  name: z.string("O nome é obrigatório").min(1, "O nome é obrigatório"),
  email: z.email("O email deve ser válido"),
  cpf: z
    .string("O cpf é obrigatório")
    .min(11, "O cpf é obrigatório")
    .max(15, "O cpf é obrigatório"),
  phone: z
    .string("O Telefone é obrigatório")
    .min(11, "O Telefone é obrigatório")
    .max(12, "O Telefone é obrigatório"),
  birthDate: z.iso.date("A data de aniversário é obrigatória"),
  active: z.boolean().optional(),
});

export type CreatePatientTypeSchema = z.infer<typeof createPatientTypeSchema>;

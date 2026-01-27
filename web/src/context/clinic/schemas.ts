import { z } from "zod";

export const createClinicFormSchema = z.object({
  name: z.string("O Nome é obrigatório").min(1, "O Nome é obrigatório"),
  cnpj: z
    .string("O CNPJ é obrigatório")
    .min(14, "O CNPJ deve ter no mínimo 14 caracteres"),
  phone: z
    .string("O Telefone é obrigatório")
    .min(10, "O Telefone deve ter no mínimo 10 caracteres")
    .max(20, "O Telefone deve ter no máximo 20 caracteres"),
  cep: z.string("O CEP é obrigatório").min(8, "O CEP é obrigatório"),
  number: z.string("O Número é obrigatório"),
  complement: z.string().optional(),
  road: z.string("A Rua é obrigatória"),
  neighborhood: z.string("O Bairro é obrigatório"),
  city: z.string("A Cidade é obrigatória"),
  active: z.boolean().optional(),
});

export type CreateClinicFormSchema = z.infer<typeof createClinicFormSchema>;

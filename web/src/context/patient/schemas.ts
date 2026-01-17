import { z } from "zod";

export const createPatientFormSchema = z.object({
  name: z.string({ error: "Campo Obrigatório" }),
  email: z.email({ error: "Campo Obrigatório" }).optional(),
  cpf: z.string({ error: "Campo Obrigatório" }),
  phone: z.string({ error: "Campo Obrigatório" }),
  birthday: z.string().optional(),
  address: z.string().optional(),
  address_number: z.string().optional(),
  neighborhood: z.string().optional(),
  zip_code: z.string().optional(),
  gender: z.string().optional(),
  complement: z.string().optional(),
  health_plan: z.string().optional(),
  number_plan: z.string().optional(),
  expiration_plan: z.string().optional(),
  active: z.boolean().default(true),
});

export type CreatePatientFormSchema = z.infer<typeof createPatientFormSchema>;

export const updatePatientFormSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.email().optional().nullable(),
  cpf: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  birthday: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  address_number: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  zip_code: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  health_plan: z.string().optional().nullable(),
  number_plan: z.string().optional().nullable(),
  expiration_plan: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
});

export type UpdatePatientFormSchema = z.infer<typeof updatePatientFormSchema>;

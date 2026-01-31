import z from "zod";

export const updateClinicFormSchema = z.object({
  name: z.string().min(1).optional().nullable(),
  cnpj: z.string().min(14).optional(),
  phone: z.string().min(10).max(20).optional(),
  cep: z.string().min(8).optional(),
  number: z.string().min(1).optional(),
  complement: z.string().optional().nullable(),
  road: z.string().min(1).optional(),
  neighborhood: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  active: z.boolean().optional(),
});

export type UpdateClinicBodySchema = z.infer<typeof updateClinicFormSchema>;

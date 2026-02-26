import z from "zod"

export const updateClinicFormSchema = z.object({
  name: z.string().min(1).optional().nullable(),
  cnpj: z.string().min(14).max(18).optional(),
  phone: z.string().min(11).max(15).optional(),
  cep: z.string().min(8).max(9).optional(),
  number: z.string().min(1).optional(),
  complement: z.string().optional().nullable(),
  road: z.string().min(1).optional(),
  neighborhood: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  active: z.boolean().optional(),
})

export type UpdateClinicBodySchema = z.infer<typeof updateClinicFormSchema>

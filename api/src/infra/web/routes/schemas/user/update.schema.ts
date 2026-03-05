import z from "zod"

export const updateUserBodySchema = z.object({
  name: z.string().min(1, "O nome deve ter no mínimo 1 caractere").optional(),
  active: z.boolean().optional(),
})

export type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

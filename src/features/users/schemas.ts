import { ClinicUserStatus } from "@/shared/enums"
import z from "zod"

export const createInviteSchema = z.object({
  email: z.email({ error: "Campo obrigatório!" }),
  role: z.enum(["ADMIN", "PROFISSIONAL", "RECEPCIONISTA"], {
    error: "Selecione uma opção!",
  }),
})

export type CreateInviteTypeSchema = z.infer<typeof createInviteSchema>

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(),
  active: z.boolean().optional(),
})

export type UpdateUserTypeSchema = z.infer<typeof updateUserSchema>

export const updateStatusUserSchema = z.object({
  status: z.enum(ClinicUserStatus),
})

export type UpdateStatusUserSchema = z.infer<typeof updateStatusUserSchema>

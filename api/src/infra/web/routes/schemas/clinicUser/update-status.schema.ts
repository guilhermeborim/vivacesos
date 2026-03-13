import z from "zod"
import { ClinicUserStatus } from "../../../../database/typeorm/sass/entities/ClinicUsers"

const ALLOWED_TRANSITIONS: Record<string, ClinicUserStatus[]> = {
  ATIVO: [ClinicUserStatus.INATIVO, ClinicUserStatus.BLOQUEADO],
  INATIVO: [ClinicUserStatus.ATIVO],
  BLOQUEADO: [ClinicUserStatus.ATIVO, ClinicUserStatus.INATIVO],
  INVITADO: [ClinicUserStatus.INATIVO],
}

export const updateUserStatusBodySchema = z.object({
  status: z.enum(ClinicUserStatus),
})

export type UpdateUserStatusBodySchema = z.infer<typeof updateUserStatusBodySchema>
export { ALLOWED_TRANSITIONS }

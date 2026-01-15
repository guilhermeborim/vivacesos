import z from "zod";
import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../database/typeorm/sass/entities/ClinicUsers";

export const bindClinicUserBodySchema = z.object({
  userId: z.uuid("O ID do usuário é obrigatório"),
  clinicId: z.uuid("O ID da clínica é obrigatório"),
  role: z.enum(ClinicUserRole).optional(),
  status: z.enum(ClinicUserStatus).optional(),
});

export type BindClinicUserBodySchema = z.infer<typeof bindClinicUserBodySchema>;

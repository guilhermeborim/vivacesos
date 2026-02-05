import z from "zod";
import { ClinicUserRole } from "../../../../database/typeorm/sass/entities/ClinicUsers";

export const registerInviteBodySchema = z.object({
  email: z.email(),
  role: z.enum(ClinicUserRole),
});

export type RegisterInviteBodySchema = z.infer<typeof registerInviteBodySchema>;

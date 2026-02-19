import { ClinicUserRole } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";

export type ClinicInviteResponse = {
  id: string;
  clinicId: string;
  email: string;
  role: ClinicUserRole;
  token: string;
  accepted: boolean;
  expiresAt: Date;
  createdAt: Date;
  acceptedAt: Date;
};

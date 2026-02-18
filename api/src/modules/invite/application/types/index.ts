import { ClinicUserRole } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";

export interface CreateInviteParams {
  email: string;
  role: ClinicUserRole;
}

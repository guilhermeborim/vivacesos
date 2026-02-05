import { ClinicUserRole } from "../../entities/ClinicUsers";

export interface CreateInviteParams {
  email: string;
  role: ClinicUserRole;
}

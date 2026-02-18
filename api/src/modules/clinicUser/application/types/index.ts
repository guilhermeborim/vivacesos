import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";

export interface BindClinicUsersParams {
  userId: string;
  clinicId: string;
  role?: ClinicUserRole;
  status?: ClinicUserStatus;
}

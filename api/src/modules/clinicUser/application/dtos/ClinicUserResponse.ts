import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";

interface ClinicUser {
  userId: string;
  clinicId: string;
  role: ClinicUserRole;
  status: ClinicUserStatus;
}
export interface ClinicUserResponse {
  userId: string;
  clinicId: string;
  role: ClinicUserRole;
  status: ClinicUserStatus;
  token?: string;
}

export interface FindUsersByClinicResponse {
  id: string;
  role: ClinicUserRole;
  status: ClinicUserStatus;
  id_user: string;
  name: string;
  email: string;
}

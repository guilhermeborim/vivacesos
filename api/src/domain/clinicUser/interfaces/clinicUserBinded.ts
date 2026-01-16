import {
  ClinicUser,
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../infra/database/typeorm/sass/entities/ClinicUsers";

export interface ClinicUserResponse {
  clinicUser: ClinicUser;
}

export interface FindUsersByClinic {
  id: string;
  role: ClinicUserRole;
  status: ClinicUserStatus;
  user: {
    id_user: string;
    name: string;
    email: string;
  };
}

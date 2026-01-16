import {
  ClinicUser,
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../infra/database/typeorm/sass/entities/ClinicUsers";

export interface ClinicUserResponse {
  clinicUser: ClinicUser;
}

export interface FindUsersByClinic {
  user: {
    id_user: string;
    name: string;
    email: string;
  };
  clinicUser: {
    id: string;
    role: ClinicUserRole;
    status: ClinicUserStatus;
  };
}

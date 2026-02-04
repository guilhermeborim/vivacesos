import {
  ClinicUser,
  ClinicUserRole,
  ClinicUserStatus,
} from "../../entities/ClinicUsers";

export interface BindClinicUsersParams {
  userId: string;
  clinicId: string;
  role?: ClinicUserRole;
  status?: ClinicUserStatus;
}

export interface ClinicUserResponse {
  clinicUser: ClinicUser;
  token?: string;
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

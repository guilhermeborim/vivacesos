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

export interface ClinicUsersRepositoryInterface {
  bindClinicUser(data: BindClinicUsersParams): Promise<ClinicUser>;
  findUserBindedClinic(
    clinicId: string,
    userId: string
  ): Promise<ClinicUser | null>;
  findUserBindedAnyClinics(userId: string): Promise<ClinicUser[] | null>;
}

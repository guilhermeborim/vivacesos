import { ClinicUser } from "../../entities/ClinicUsers";
import {
  BindClinicUsersParams,
  FindUsersByClinic,
} from "../../interfaces/clinicUser";

export interface ClinicUsersRepositoryInterface {
  bindClinicUser(data: BindClinicUsersParams): Promise<ClinicUser>;
  getClinicsByUser(userId: string): Promise<ClinicUser[]>; //ClinicUser[]
  getUsersByClinic(clinicId: string): Promise<FindUsersByClinic[]>; // FindUsersByClinic[]
  getUserBindedClinic(
    clinicId: string,
    userId: string,
  ): Promise<ClinicUser | null>;
}

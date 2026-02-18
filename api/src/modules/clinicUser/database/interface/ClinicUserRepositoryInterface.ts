import { ClinicUser } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import {
  BindClinicUsersParams,
  FindUsersByClinic,
} from "../../application/types";

export interface ClinicUsersRepositoryInterface {
  bindClinicUser(data: BindClinicUsersParams): Promise<ClinicUser>;
  getClinicsByUser(userId: string): Promise<ClinicUser[]>; //ClinicUser[]
  getUsersByClinic(clinicId: string): Promise<FindUsersByClinic[]>; // FindUsersByClinic[]
  getUserBindedClinic(
    clinicId: string,
    userId: string,
  ): Promise<ClinicUser | null>;
}

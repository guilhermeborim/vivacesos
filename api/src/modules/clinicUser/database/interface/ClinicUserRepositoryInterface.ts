import { ClinicUser } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import { BindClinicUsersParams } from "../../application/types";

export interface ClinicUsersRepositoryInterface {
  bindClinicUser(data: BindClinicUsersParams): Promise<ClinicUser>;
  getClinicsByUser(userId: string): Promise<ClinicUser[]>; //ClinicUser[]
  getUsersByClinic(clinicId: string): Promise<ClinicUser[]>; // FindUsersByClinic[]
  getUserBindedClinic(
    clinicId: string,
    userId: string,
  ): Promise<ClinicUser | null>;
}

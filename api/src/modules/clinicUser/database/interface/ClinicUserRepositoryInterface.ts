import {
  ClinicUserResponse,
  FindUsersByClinicResponse,
} from "../../application/dtos/ClinicUserResponse";
import { BindClinicUsersParams } from "../../application/types";

export interface ClinicUsersRepositoryInterface {
  bindClinicUser(data: BindClinicUsersParams): Promise<ClinicUserResponse>;
  getClinicsByUser(userId: string): Promise<ClinicUserResponse[]>; //ClinicUser[]
  getUsersByClinic(clinicId: string): Promise<FindUsersByClinicResponse[]>; // FindUsersByClinic[]
  getUserBindedClinic(
    clinicId: string,
    userId: string,
  ): Promise<ClinicUserResponse | null>;
}

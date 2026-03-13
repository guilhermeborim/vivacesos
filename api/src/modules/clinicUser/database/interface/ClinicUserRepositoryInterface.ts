import {
  ClinicUser,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers"
import { BindClinicUsersParams } from "../../application/types"

export interface ClinicUsersRepositoryInterface {
  bindClinicUser(data: BindClinicUsersParams): Promise<ClinicUser>
  getClinicsByUser(userId: string): Promise<ClinicUser[]> //ClinicUser[]
  getUsersByClinic(clinicId: string): Promise<any[]> // FindUsersByClinic[]
  getUserBindedClinic(clinicId: string, userId: string): Promise<ClinicUser | null>
  updateClinicUserStatus(
    clinicId: string,
    userId: string,
    status: ClinicUserStatus,
  ): Promise<void>
}

import { ClinicInvite } from "../../../../infra/database/typeorm/sass/entities/ClinicInvites";
import { CreateInviteParams } from "../../application/types";

export interface InviteRepositoryInterface {
  invite(
    payload: CreateInviteParams,
    clinicId: string,
    token: string,
  ): Promise<ClinicInvite>;
  updateInvite(id: string): Promise<void>;
  deleteInviteExpires(id: string): Promise<void>;
  getInviteByToken(token: string): Promise<ClinicInvite>;
  getInviteByEmail(email: string): Promise<ClinicInvite>;
}

import { ClinicInvite } from "../../entities/ClinicInvites";
import { CreateInviteParams } from "../../interfaces/invite";

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

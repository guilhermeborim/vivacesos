import { ClinicInviteResponse } from "../../application/dtos/ClinicInviteResponse";
import { CreateInviteParams } from "../../application/types";

export interface InviteRepositoryInterface {
  invite(
    payload: CreateInviteParams,
    clinicId: string,
    token: string,
  ): Promise<ClinicInviteResponse>;
  updateInvite(id: string): Promise<void>;
  deleteInviteExpires(id: string): Promise<void>;
  getInviteByToken(token: string): Promise<ClinicInviteResponse>;
  getInviteByEmail(email: string): Promise<ClinicInviteResponse>;
}

import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error";
import { InviteTypeormRepository } from "../../database/repositories/InviteTypeormRepository";
import { ClinicInviteResponse } from "../dtos/ClinicInviteResponse";

export class GetInviteByEmailService {
  private inviteRepository: InviteTypeormRepository;

  constructor() {
    this.inviteRepository = new InviteTypeormRepository();
  }

  async execute(email: string): Promise<ClinicInviteResponse> {
    if (!email) {
      throw new UnauthenticatedError("Acesso negado, sem email!");
    }
    const invite = await this.inviteRepository.getInviteByEmail(email);

    return invite;
  }
}

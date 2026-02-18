import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error";
import { InviteTypeormRepository } from "../../database/repositories/InviteTypeormRepository";
import { ClinicInviteResponse } from "../dtos/ClinicInviteResponse";

export class GetInviteByTokenService {
  private inviteRepository: InviteTypeormRepository;

  constructor() {
    this.inviteRepository = new InviteTypeormRepository();
  }

  async execute(token: string): Promise<ClinicInviteResponse> {
    if (!token) {
      throw new UnauthenticatedError("Acesso negado, sem token!");
    }
    const invite = await this.inviteRepository.getInviteByToken(token);

    return invite;
  }
}

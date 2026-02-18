import { ClinicInvite } from "../../../../infra/database/typeorm/sass/entities/ClinicInvites";
import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error";
import { InviteTypeormRepository } from "../../database/repositories/InviteTypeormRepository";

export class GetInviteByTokenService {
  private inviteRepository: InviteTypeormRepository;

  constructor() {
    this.inviteRepository = new InviteTypeormRepository();
  }

  async execute(token: string): Promise<ClinicInvite> {
    if (!token) {
      throw new UnauthenticatedError("Acesso negado, sem token!");
    }
    const invite = await this.inviteRepository.getInviteByToken(token);

    return invite;
  }
}

import { ClinicInvite } from "../../../infra/database/typeorm/sass/entities/ClinicInvites";
import { InviteTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/invite.repository";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";

export class GetInviteByEmailService {
  private inviteRepository: InviteTypeormRepository;

  constructor() {
    this.inviteRepository = new InviteTypeormRepository();
  }

  async execute(email: string): Promise<ClinicInvite> {
    if (!email) {
      throw new UnauthenticatedError("Acesso negado, sem email!");
    }
    const invite = await this.inviteRepository.getInviteByEmail(email);

    return invite;
  }
}

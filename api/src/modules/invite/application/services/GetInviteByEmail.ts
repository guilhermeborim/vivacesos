import { ClinicInvite } from "../../../../infra/database/typeorm/sass/entities/ClinicInvites";
import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error";
import { InviteTypeormRepository } from "../../database/repositories/InviteTypeormRepository";

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

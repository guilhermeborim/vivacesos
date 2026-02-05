import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { InviteTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/invite.repository";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";

export class UpdateInviteService {
  private inviteRepository: InviteTypeormRepository;
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.inviteRepository = new InviteTypeormRepository();
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new UnauthenticatedError("Por favor, informe o ID do Convite!");
    }

    await this.inviteRepository.updateInvite(id);

    return;
  }
}

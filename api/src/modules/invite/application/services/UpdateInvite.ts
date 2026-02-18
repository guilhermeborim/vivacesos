import { UnauthenticatedError } from "../../../../shared/errors/unauthenticated.error";
import { ClinicUsersTypeormRepository } from "../../../clinicUser/database/repositories/ClinicUserTypeormRepository";
import { InviteTypeormRepository } from "../../database/repositories/InviteTypeormRepository";

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

import { ClinicUser } from "../../../infra/database/typeorm/sass/entities/ClinicUsers";
import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { decrypt } from "../../../infra/utils/crypto";

export class FindUsersByAnyClinicService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(userId: string): Promise<ClinicUser[]> {
    const clinicUsers =
      await this.clinicUserRepository.findUserBindedAnyClinics(userId);

    for (const clinicUser of clinicUsers) {
      clinicUser.clinic.cnpj = decrypt(clinicUser.clinic.cnpj);
    }

    return clinicUsers;
  }
}

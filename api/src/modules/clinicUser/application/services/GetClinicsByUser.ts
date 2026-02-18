import { ClinicUser } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import { decrypt } from "../../../../shared/utils/crypto";
import { ClinicUsersTypeormRepository } from "../../database/repositories/ClinicUserTypeormRepository";

export class GetClinicsByUserService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(userId: string): Promise<ClinicUser[]> {
    const clinicUsers =
      await this.clinicUserRepository.getClinicsByUser(userId);

    for (const clinicUser of clinicUsers) {
      clinicUser.clinic.cnpj = decrypt(clinicUser.clinic.cnpj);
    }

    return clinicUsers;
  }
}

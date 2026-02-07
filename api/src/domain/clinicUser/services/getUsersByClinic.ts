import { ClinicUser } from "../../../infra/database/typeorm/sass/entities/ClinicUsers";
import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";

export class GetUsersByClinicService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(clinicId: string): Promise<ClinicUser[]> {
    const clinicUsers =
      await this.clinicUserRepository.getUsersByClinic(clinicId);

    return clinicUsers;
  }
}

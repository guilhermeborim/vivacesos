import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { FindUsersByClinic } from "../interfaces/clinicUserBinded";

export class FindUsersByClinicService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(clinicId: string): Promise<FindUsersByClinic[]> {
    const clinicUsers = await this.clinicUserRepository.findUsersByClinic(
      clinicId
    );
    return clinicUsers;
  }
}

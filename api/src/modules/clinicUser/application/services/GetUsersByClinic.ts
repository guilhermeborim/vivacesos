import { ClinicUsersTypeormRepository } from "../../database/repositories/ClinicUserTypeormRepository";
import { FindUsersByClinic } from "../types";

export class GetUsersByClinicService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(clinicId: string): Promise<FindUsersByClinic[]> {
    const clinicUsers =
      await this.clinicUserRepository.getUsersByClinic(clinicId);

    return clinicUsers;
  }
}

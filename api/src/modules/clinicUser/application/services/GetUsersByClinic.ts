import { ClinicUsersTypeormRepository } from "../../database/repositories/ClinicUserTypeormRepository";
import { FindUsersByClinicResponse } from "../dtos/ClinicUserResponse";

export class GetUsersByClinicService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(clinicId: string): Promise<FindUsersByClinicResponse[]> {
    const clinicUsers =
      await this.clinicUserRepository.getUsersByClinic(clinicId);

    return clinicUsers;
  }
}

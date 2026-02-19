import { ClinicUsersTypeormRepository } from "../../database/repositories/ClinicUserTypeormRepository";
import { GetUsersByClinicResponse } from "../dtos/ClinicUserResponse";
import { GetUsersByClinicMapper } from "../mappers/ClinicUserMapper";

export class GetUsersByClinicService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(clinicId: string): Promise<GetUsersByClinicResponse[]> {
    const clinicUsers =
      await this.clinicUserRepository.getUsersByClinic(clinicId);

    return clinicUsers.map(GetUsersByClinicMapper.toResponse);
  }
}

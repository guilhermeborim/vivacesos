import { ClinicUsersTypeormRepository } from "../../database/repositories/ClinicUserTypeormRepository";
import { ClinicUserResponse } from "../dtos/ClinicUserResponse";

export class GetClinicsByUserService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(userId: string): Promise<ClinicUserResponse[]> {
    const clinicUsers =
      await this.clinicUserRepository.getClinicsByUser(userId);

    // TODO: Verificar depois no Front se eu preciso dessa informação

    // for (const clinicUser of clinicUsers) {
    //   clinicUser.clinic.cnpj = decrypt(clinicUser.clinic.cnpj);
    // }

    return clinicUsers;
  }
}

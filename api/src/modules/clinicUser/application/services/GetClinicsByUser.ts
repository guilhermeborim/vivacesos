import { ClinicUsersTypeormRepository } from "../../database/repositories/ClinicUserTypeormRepository";
import { GetClinicsByUserResponse } from "../dtos/ClinicUserResponse";
import { GetClinicsByUserMapper } from "../mappers/ClinicUserMapper";

export class GetClinicsByUserService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(userId: string): Promise<GetClinicsByUserResponse[]> {
    const clinicUsers =
      await this.clinicUserRepository.getClinicsByUser(userId);

    // TODO: Verificar depois no Front se eu preciso dessa informação

    // for (const clinicUser of clinicUsers) {
    //   clinicUser.clinic.cnpj = decrypt(clinicUser.clinic.cnpj);
    // }

    return clinicUsers.map(GetClinicsByUserMapper.toResponse);
  }
}

import { ClinicUsersTypeormRepository } from "../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { BindClinicUsersParams } from "../../infra/database/typeorm/sass/repositories/interfaces/clinic-users-repository.interface";
import { UnauthenticatedError } from "../../shared/errors/unauthenticated.error";
import { ClinicUserResponse } from "./interfaces/clinicUserBinded";

export class BindClinicUserService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(
    clinicUser: BindClinicUsersParams
  ): Promise<ClinicUserResponse> {
    const userBindedClinic =
      await this.clinicUserRepository.findUserBindedClinic(
        clinicUser.clinicId,
        clinicUser.userId
      );

    if (userBindedClinic) {
      throw new UnauthenticatedError("Usuário já está vinculado a clínica!");
    }

    const clinicUserBinded = await this.clinicUserRepository.bindClinicUser(
      clinicUser
    );

    return {
      clinicUser: clinicUserBinded,
    };
  }
}

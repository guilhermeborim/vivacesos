import { Repository } from "typeorm";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { SassDataSource } from "../data-source";
import {
  ClinicUser,
  ClinicUserRole,
  ClinicUserStatus,
} from "../entities/ClinicUsers";
import {
  BindClinicUsersParams,
  ClinicUsersRepositoryInterface,
} from "./interfaces/clinic-users-repository.interface";

export class ClinicUsersTypeormRepository
  implements ClinicUsersRepositoryInterface
{
  private clinicUsersRepository: Repository<ClinicUser>;

  constructor() {
    this.clinicUsersRepository = SassDataSource.getRepository(ClinicUser);
  }

  async bindClinicUser(clinicUser: BindClinicUsersParams): Promise<ClinicUser> {
    try {
      const clinicUserBinded = await this.clinicUsersRepository.save({
        ...clinicUser,
        role: ClinicUserRole.ADMIN,
        status: ClinicUserStatus.ATIVO,
      });
      return clinicUserBinded;
    } catch (error) {
      throw new DatabaseError("Falha ao vicular usuário à clínica", error);
    }
  }

  async findUserBindedClinic(
    clinicId: string,
    userId: string
  ): Promise<ClinicUser | null> {
    try {
      const clinicUser = await this.clinicUsersRepository.findOne({
        where: {
          clinicId,
          userId,
        },
      });
      return clinicUser;
    } catch (error) {
      throw new DatabaseError(
        "Falha ao buscar usuário vinculado à clínica!",
        error
      );
    }
  }

  async findUserBindedAnyClinics(userId: string): Promise<ClinicUser[] | null> {
    try {
      const clinicUsers = await this.clinicUsersRepository.find({
        where: {
          userId,
        },
      });

      return clinicUsers;
    } catch (error) {
      throw new DatabaseError(
        "Falha ao buscar usuário vinculado a clínicas!",
        error
      );
    }
  }
}

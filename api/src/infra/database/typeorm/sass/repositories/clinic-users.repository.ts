import { Repository } from "typeorm";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { SassDataSource } from "../data-source";
import { ClinicUser } from "../entities/ClinicUsers";
import {
  BindClinicUsersParams,
  FindUsersByClinic,
} from "../interfaces/clinicUser";
import { ClinicUsersRepositoryInterface } from "./interfaces/clinic-users-repository.interface";

export class ClinicUsersTypeormRepository implements ClinicUsersRepositoryInterface {
  private clinicUsersRepository: Repository<ClinicUser>;

  constructor() {
    this.clinicUsersRepository = SassDataSource.getRepository(ClinicUser);
  }

  async bindClinicUser(clinicUser: BindClinicUsersParams): Promise<ClinicUser> {
    try {
      const clinicUserBinded = await this.clinicUsersRepository.save({
        ...clinicUser,
        role: clinicUser.role,
        status: clinicUser.status,
      });
      return clinicUserBinded;
    } catch (error) {
      throw new DatabaseError("Falha ao vicular usuário à clínica", error);
    }
  }

  async getUserBindedClinic(
    clinicId: string,
    userId: string,
  ): Promise<ClinicUser | null> {
    try {
      const clinicUser = await this.clinicUsersRepository.findOne({
        where: {
          clinicId,
          userId,
        },
        relations: ["user", "clinic"],
      });
      return clinicUser;
    } catch (error) {
      throw new DatabaseError(
        "Falha ao buscar usuário vinculado à clínica!",
        error,
      );
    }
  }

  async getClinicsByUser(userId: string): Promise<ClinicUser[]> {
    try {
      const clinicUsers = await this.clinicUsersRepository.find({
        where: { userId },
        relations: ["clinic"],
      });

      return clinicUsers;
    } catch (error) {
      throw new DatabaseError(
        "Falha ao buscar usuário vinculado a clínicas!",
        error,
      );
    }
  }

  async getUsersByClinic(clinicId: string): Promise<FindUsersByClinic[]> {
    try {
      const clinicUsers = await this.clinicUsersRepository.query(
        `
          SELECT
          cu.id,
          cu.role,
          cu.status,
          u.id AS "id_user",
          u.name,
          u.email
          FROM clinic_users cu
          INNER JOIN users u ON cu.userId = u.id
          WHERE cu.clinicId = $1
        `,
        [clinicId],
      );

      return clinicUsers.map((clinicUser: any) => ({
        id: clinicUser.id,
        role: clinicUser.role,
        status: clinicUser.status,
        user: {
          id_user: clinicUser.id_user,
          name: clinicUser.name,
          email: clinicUser.email,
        },
      }));
    } catch (error) {
      throw new DatabaseError(
        "Falha ao buscar usuários vinculados à clínica!",
        error,
      );
    }
  }
}

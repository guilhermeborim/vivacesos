import { Repository } from "typeorm";
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source";
import { ClinicUser } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import { DatabaseError } from "../../../../shared/errors/database.error";
import {
  ClinicUserResponse,
  FindUsersByClinicResponse,
} from "../../application/dtos/ClinicUserResponse";
import { BindClinicUsersParams } from "../../application/types";
import { ClinicUsersRepositoryInterface } from "../interface/ClinicUserRepositoryInterface";

export class ClinicUsersTypeormRepository implements ClinicUsersRepositoryInterface {
  private clinicUsersRepository: Repository<ClinicUser>;

  constructor() {
    this.clinicUsersRepository = SassDataSource.getRepository(ClinicUser);
  }

  async bindClinicUser(
    clinicUser: BindClinicUsersParams,
  ): Promise<ClinicUserResponse> {
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
  ): Promise<ClinicUserResponse | null> {
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

  async getClinicsByUser(userId: string): Promise<ClinicUserResponse[]> {
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

  async getUsersByClinic(
    clinicId: string,
  ): Promise<FindUsersByClinicResponse[]> {
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
          INNER JOIN users u ON cu."userId" = u.id
          WHERE cu."clinicId" = $1
        `,
        [clinicId],
      );

      return clinicUsers.map((clinicUser: any) => ({
        id: clinicUser.id,
        role: clinicUser.role,
        status: clinicUser.status,
        id_user: clinicUser.id_user,
        name: clinicUser.name,
        email: clinicUser.email,
      }));
    } catch (error) {
      throw new DatabaseError(
        "Falha ao buscar usuários vinculados à clínica!",
        error,
      );
    }
  }
}

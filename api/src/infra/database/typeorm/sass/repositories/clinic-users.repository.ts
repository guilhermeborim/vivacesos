import { Repository } from "typeorm";
import { FindUsersByClinic } from "../../../../../domain/clinicUser/interfaces/clinicUserBinded";
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

export class ClinicUsersTypeormRepository implements ClinicUsersRepositoryInterface {
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

  async findUserBindedAnyClinics(userId: string): Promise<ClinicUser[]> {
    try {
      const clinicUsers = await this.clinicUsersRepository.query(
        `
          SELECT 
          c.name,
          c.id AS clinic_id,
          cu.role
          FROM clinic_users cu
          INNER JOIN clinics c ON cu.clinic_id = c.id
          WHERE cu.user_id = $1
        `,
        [userId],
      );

      return clinicUsers;
    } catch (error) {
      throw new DatabaseError(
        "Falha ao buscar usuário vinculado a clínicas!",
        error,
      );
    }
  }

  async findUsersByClinic(clinicId: string): Promise<FindUsersByClinic[]> {
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
          INNER JOIN users u ON cu.user_id = u.id
          WHERE cu.clinic_id = $1
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

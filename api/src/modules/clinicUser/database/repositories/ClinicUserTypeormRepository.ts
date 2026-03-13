import { Repository } from "typeorm"
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source"
import {
  ClinicUser,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers"
import { DatabaseError } from "../../../../shared/errors/database.error"
import { BindClinicUsersParams } from "../../application/types"
import { ClinicUsersRepositoryInterface } from "../interface/ClinicUserRepositoryInterface"

export class ClinicUsersTypeormRepository implements ClinicUsersRepositoryInterface {
  private clinicUsersRepository: Repository<ClinicUser>

  constructor() {
    this.clinicUsersRepository = SassDataSource.getRepository(ClinicUser)
  }

  async bindClinicUser(clinicUser: BindClinicUsersParams): Promise<ClinicUser> {
    try {
      const clinicUserBinded = await this.clinicUsersRepository.save({
        ...clinicUser,
        role: clinicUser.role,
        status: clinicUser.status,
      })
      return clinicUserBinded
    } catch (error) {
      throw new DatabaseError("Falha ao vicular usuário à clínica", error)
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
      })
      return clinicUser
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuário vinculado à clínica!", error)
    }
  }

  async getClinicsByUser(userId: string): Promise<ClinicUser[]> {
    try {
      const clinicUsers = await this.clinicUsersRepository.find({
        where: { userId },
        relations: ["clinic"],
      })

      return clinicUsers
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuário vinculado a clínicas!", error)
    }
  }

  async getUsersByClinic(clinicId: string): Promise<any[]> {
    try {
      const clinicUsers = await this.clinicUsersRepository.query(
        `
        SELECT
          cu.id                    AS "clinicUserId",
          cu."userId",
          cu.role::varchar         AS role,
          cu.status::varchar       AS status,
          cu."createdAt", 
          row_to_json(u)           AS "user",
          NULL                     AS "invite"
        FROM clinic_users cu
        INNER JOIN users u ON cu."userId" = u.id
        WHERE cu."clinicId" = $1

        UNION ALL

        SELECT
          ci.id                    AS "clinicUserId",
          NULL                     AS "userId",
          ci.role::varchar         AS role,
          'INVITADO'::varchar      AS status,
          ci."createdAt",
          NULL                     AS "user",
          json_build_object(
            'email',     ci.email,
            'accepted',  ci.accepted,
            'expiresAt', ci."expiresAt"
          )                        AS "invite"
        FROM clinic_invites ci
        WHERE ci."clinicId" = $1
          AND ci.accepted = false
          AND ci."expiresAt" > NOW()

        ORDER BY "createdAt" DESC;
      `,
        [clinicId],
      )

      return clinicUsers
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuários vinculados à clínica!", error)
    }
  }

  async updateClinicUserStatus(
    clinicId: string,
    userId: string,
    status: ClinicUserStatus,
  ): Promise<void> {
    try {
      await this.clinicUsersRepository.update({ clinicId, userId }, { status })
    } catch (error) {
      throw new DatabaseError("Falha ao atualizar status do usuário!", error)
    }
  }
}

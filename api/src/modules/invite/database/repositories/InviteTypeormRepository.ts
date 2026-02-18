import { Repository } from "typeorm";
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source";
import { ClinicInvite } from "../../../../infra/database/typeorm/sass/entities/ClinicInvites";
import { DatabaseError } from "../../../../shared/errors/database.error";
import { ClinicInviteResponse } from "../../application/dtos/ClinicInviteResponse";
import { CreateInviteParams } from "../../application/types";
import { InviteRepositoryInterface } from "../interface/InviteRepositoryInterface";

export class InviteTypeormRepository implements InviteRepositoryInterface {
  private inviteRepository: Repository<ClinicInvite>;

  constructor() {
    this.inviteRepository = SassDataSource.getRepository(ClinicInvite);
  }

  async invite(
    payload: CreateInviteParams,
    clinicId: string,
    token: string,
  ): Promise<ClinicInviteResponse> {
    try {
      const invite = await this.inviteRepository.save({
        ...payload,
        clinicId,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      return invite;
    } catch (error) {
      throw new DatabaseError("Erro ao criar convite!", error);
    }
  }

  async getInviteByToken(token: string): Promise<ClinicInviteResponse> {
    try {
      const invite = await this.inviteRepository.findOne({
        where: {
          token,
        },
      });

      return invite;
    } catch (error) {
      throw new DatabaseError("Erro ao buscar convite!", error);
    }
  }

  async getInviteByEmail(email: string): Promise<ClinicInviteResponse> {
    try {
      const invite = await this.inviteRepository.findOne({
        where: {
          email,
        },
      });

      return invite;
    } catch (error) {
      throw new DatabaseError("Erro ao buscar convite!", error);
    }
  }

  async updateInvite(id: string): Promise<void> {
    try {
      await this.inviteRepository.update(id, {
        accepted: true,
        acceptedAt: new Date(),
      });
    } catch (error) {
      throw new DatabaseError("Erro ao atualizar convite!", error);
    }
  }

  async deleteInviteExpires(id: string): Promise<void> {
    try {
      await this.inviteRepository.delete(id);
    } catch (error) {
      throw new DatabaseError("Erro ao deletar convite!", error);
    }
  }
}

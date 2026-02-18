import { Repository } from "typeorm";
import { SassDataSource } from "../../../../infra/database/typeorm/sass/data-source";
import { RefreshToken } from "../../../../infra/database/typeorm/sass/entities/RefreshToken";
import { DatabaseError } from "../../../../shared/errors/database.error";
import { RefreshTokenResponse } from "../../application/dtos/RefreshTokenResponse";
import { CreateRefreshTokenParams } from "../../application/types";
import { RefreshTokenRepositoryInterface } from "../interface/RefreshTokenTypeormInterface";

export class RefreshTokenRepository implements RefreshTokenRepositoryInterface {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = SassDataSource.getRepository(RefreshToken);
  }

  async create(data: CreateRefreshTokenParams): Promise<RefreshTokenResponse> {
    try {
      const refreshToken = this.repository.create(data);
      return await this.repository.save(refreshToken);
    } catch (error) {
      throw new DatabaseError("Falha ao criar refresh token", error);
    }
  }

  async findByToken(token: string): Promise<RefreshTokenResponse | null> {
    try {
      return await this.repository.findOne({
        where: { token, isRevoked: false },
        relations: ["user", "clinic"],
      });
    } catch (error) {
      throw new DatabaseError("Falha ao buscar refresh token", error);
    }
  }

  async revokeByUserId(userId: string): Promise<void> {
    try {
      await this.repository.update(
        { userId, isRevoked: false },
        { isRevoked: true },
      );
    } catch (error) {
      throw new DatabaseError("Falha ao revogar tokens do usuário", error);
    }
  }

  async revokeByToken(token: string): Promise<void> {
    try {
      await this.repository.update({ token }, { isRevoked: true });
    } catch (error) {
      throw new DatabaseError("Falha ao revogar refresh token", error);
    }
  }

  async deleteExpired(): Promise<void> {
    try {
      await this.repository
        .createQueryBuilder()
        .delete()
        .where("expires_at < :now OR is_revoked = :revoked", {
          now: new Date(),
          revoked: true,
        })
        .execute();
    } catch (error) {
      throw new DatabaseError("Falha ao deletar tokens expirados", error);
    }
  }

  async deleteByRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.repository.delete({
        token: refreshToken,
      });
    } catch (error) {
      throw new DatabaseError("Falha ao deletar refresh token", error);
    }
  }
}

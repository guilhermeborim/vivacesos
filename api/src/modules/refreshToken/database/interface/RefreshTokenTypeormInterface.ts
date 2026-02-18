import { RefreshToken } from "../../../../infra/database/typeorm/sass/entities/RefreshToken";
import { CreateRefreshTokenParams } from "../../application/types";

export interface RefreshTokenRepositoryInterface {
  create(data: CreateRefreshTokenParams): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  revokeByUserId(userId: string): Promise<void>;
  revokeByToken(token: string): Promise<void>;
  deleteExpired(): Promise<void>;
  deleteByRefreshToken(token: string): Promise<void>;
}

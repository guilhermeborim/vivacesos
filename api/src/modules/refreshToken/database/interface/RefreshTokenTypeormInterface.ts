import { RefreshTokenResponse } from "../../application/dtos/RefreshTokenResponse";
import { CreateRefreshTokenParams } from "../../application/types";

export interface RefreshTokenRepositoryInterface {
  create(data: CreateRefreshTokenParams): Promise<RefreshTokenResponse>;
  findByToken(token: string): Promise<RefreshTokenResponse | null>;
  revokeByUserId(userId: string): Promise<void>;
  revokeByToken(token: string): Promise<void>;
  deleteExpired(): Promise<void>;
  deleteByRefreshToken(token: string): Promise<void>;
}

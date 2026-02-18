export interface CreateRefreshTokenParams {
  token: string;
  userId: string;
  clinicId?: string | null;
  expiresAt: Date;
}

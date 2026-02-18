export interface RefreshTokenResponse {
  token: string;
  userId: string;
  clinicId?: string | null;
  expiresAt: Date;
  isRevoked: boolean;
}

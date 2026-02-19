export type RefreshTokenResponse = {
  token: string;
  userId: string;
  clinicId?: string | null;
  expiresAt: Date;
  isRevoked: boolean;
  user: {
    email: string;
  };
};

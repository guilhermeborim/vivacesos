import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: string;
  email: string;
  clinicId?: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class JWTService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpiry: string;
  private readonly refreshTokenExpiry: string;

  constructor() {
    this.accessTokenSecret = process.env.JWT_SECRET;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
    this.accessTokenExpiry = process.env.JWT_EXPIRY;
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY;
  }

  generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
    });
  }

  generateRefreshToken(): string {
    return randomBytes(64).toString("hex");
  }

  generateTokenPair(payload: JWTPayload): TokenPair {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(),
    };
  }

  verifyAccessToken(token: string): JWTPayload {
    return jwt.verify(token, this.accessTokenSecret) as JWTPayload;
  }

  verifyRefreshToken(refreshToken: string): JWTPayload {
    return jwt.verify(refreshToken, this.refreshTokenSecret) as JWTPayload;
  }

  getRefreshTokenExpiryDate(): Date {
    const now = new Date();
    const expiryDays = parseInt(this.refreshTokenExpiry.replace("d", "")) || 7;
    return new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  }

  isRefreshTokenValid(expiresAt: Date): boolean {
    return new Date() < expiresAt;
  }
}

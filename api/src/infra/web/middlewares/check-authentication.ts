import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { JWTError, JWTErrorType } from "../../../shared/errors/jwt.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { JWTService } from "../../../shared/services/jwt.service";
import { UserTypeormRepository } from "../../database/typeorm/sass/repositories/user.repository";

export class CheckAuthtenticationMiddleware {
  private authRepository: UserTypeormRepository;
  private jwtService: JWTService;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.jwtService = new JWTService();
  }

  execute = async (request: FastifyRequest) => {
    const token = request.cookies.token;

    try {
      const payload = this.jwtService.verifyAccessToken(token);

      const user = await this.authRepository.findByEmail(payload.email);

      if (!user) {
        throw new JWTError(
          "Usuário não encontrado",
          JWTErrorType.USER_NOT_FOUND,
        );
      }

      request.user = user;
      request.clinicId = payload.clinicId || null;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new JWTError("Token expirado", JWTErrorType.TOKEN_EXPIRED);
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new JWTError("Token inválido", JWTErrorType.TOKEN_INVALID);
      }

      if (error instanceof jwt.NotBeforeError) {
        throw new JWTError(
          "Token ainda não é válido",
          JWTErrorType.TOKEN_INVALID,
        );
      }

      if (error instanceof JWTError || error instanceof UnauthenticatedError) {
        throw error;
      }

      throw new JWTError("Falha na autenticação", JWTErrorType.TOKEN_INVALID);
    }
  };
}

import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { AppError } from "../../../shared/errors/app.error";
import { ConflictError } from "../../../shared/errors/conflict.error";
import { DatabaseError } from "../../../shared/errors/database.error";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";
import { HttpError } from "../../../shared/errors/http.error";
import { JWTError } from "../../../shared/errors/jwt.error";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { UnprocessedEntityError } from "../../../shared/errors/unprocessed-entity.error";

export const configure = (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {
    if (
      (error instanceof AppError && error.getShouldPrintInConsole()) ||
      !(error instanceof AppError)
    ) {
      console.error("", error);
    }

    if (error instanceof HttpError) {
      return reply.status(error.getStatusCode()).send({
        message: error.message,
      });
    }

    if (error instanceof JWTError) {
      return reply.status(401).send({
        message: error.message,
        errorType: error.getErrorType(),
        code: "JWT_ERROR",
      });
    }

    if (error instanceof UnauthenticatedError) {
      return reply.status(401).send({
        message: error.message,
      });
    }

    if (error instanceof ForbiddenError) {
      return reply.status(403).send({
        message: error.message,
      });
    }

    if (error instanceof ConflictError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    if (error instanceof NotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    if (error instanceof DatabaseError) {
      return reply.status(500).send({
        message: error.message,
      });
    }

    if (error instanceof UnprocessedEntityError) {
      return reply.status(error.getStatusCode()).send({
        message: error.message,
        errors: error.getErrors(),
      });
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "Dados inválidos fornecidos",
        errors: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    return reply.status(500).send({
      message: "Server error.",
    });
  });
};

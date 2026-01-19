import { FastifyInstance } from "fastify";
import { AuthenticateController } from "../controllers/user/authenticate.controller";
import { LogoutController } from "../controllers/user/logout.controller";
import { RefreshTokenController } from "../controllers/user/refresh-token.controller";
import { RegisterController } from "../controllers/user/register.controller";
import { SessionController } from "../controllers/user/session.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";

export const configure = (fastify: FastifyInstance) => {
  const authenticateController = new AuthenticateController();
  const registerController = new RegisterController();
  const sessionController = new SessionController();
  const refreshTokenController = new RefreshTokenController();
  const logoutController = new LogoutController();
  const checkAuthenticationMiddleware = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/auth/register",
    method: "POST",
    handler: registerController.execute,
  });

  fastify.route({
    url: "/auth/login",
    method: "POST",
    handler: authenticateController.execute,
  });

  fastify.route({
    url: "/auth/session",
    method: "GET",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: sessionController.execute,
  });

  fastify.route({
    url: "/auth/refresh",
    method: "POST",
    handler: refreshTokenController.execute,
  });

  fastify.route({
    url: "/auth/logout",
    method: "POST",
    handler: logoutController.execute,
  });
};

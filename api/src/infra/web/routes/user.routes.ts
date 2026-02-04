import { FastifyInstance } from "fastify";
import { AuthenticateController } from "../controllers/user/authenticate";
import { LogoutController } from "../controllers/user/logout";
import { NextOnboardingStepController } from "../controllers/user/next-onboarding-step";
import { RefreshTokenController } from "../controllers/user/refresh-token";
import { RegisterController } from "../controllers/user/register";
import { SelectClinicController } from "../controllers/user/select-clinic";
import { SessionController } from "../controllers/user/session";
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication";
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic";

export const configure = (fastify: FastifyInstance) => {
  const authenticateController = new AuthenticateController();
  const registerController = new RegisterController();
  const sessionController = new SessionController();
  const refreshTokenController = new RefreshTokenController();
  const logoutController = new LogoutController();
  const nextOnboardingStepController = new NextOnboardingStepController();
  const selectClinicController = new SelectClinicController();
  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware();
  const checkClinicMiddleware = new CheckClinicUserMiddleware();

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

  fastify.route({
    url: "/auth/session/select-clinic",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: selectClinicController.execute,
  });

  fastify.route({
    url: "/auth/session/next-step",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: nextOnboardingStepController.execute,
  });
};

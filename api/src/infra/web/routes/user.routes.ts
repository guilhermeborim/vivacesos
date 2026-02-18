import { FastifyInstance } from "fastify";
import { AuthenticateController } from "../../../modules/users/application/controllers/Authenticate";
import { LogoutController } from "../../../modules/users/application/controllers/logout";
import { NextOnboardingStepController } from "../../../modules/users/application/controllers/NextOnboardingStep";
import { RefreshTokenController } from "../../../modules/users/application/controllers/RefreshToken";
import { RegisterController } from "../../../modules/users/application/controllers/Register";
import { SelectClinicController } from "../../../modules/users/application/controllers/SelectClinic";
import { SessionController } from "../../../modules/users/application/controllers/Session";
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

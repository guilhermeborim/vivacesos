import { FastifyInstance } from "fastify";
import { RegisterProfessionalOnboardingController } from "../controllers/professional/registerOnboarding";
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication";

export const configure = (fastify: FastifyInstance) => {
  const registerProfessionalOnboardingController =
    new RegisterProfessionalOnboardingController();
  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware();

  fastify.route({
    url: "/professional/onboarding",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: registerProfessionalOnboardingController.execute,
  });
};

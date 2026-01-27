import { FastifyInstance } from "fastify";
import { GetProfessionalsByClinicController } from "../controllers/professional/getByClinic.controller";
import { RegisterProfessionalController } from "../controllers/professional/register.controller";
import { RegisterProfessionalOnboardingController } from "../controllers/professional/registerOnboarding.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic";

export const configure = (fastify: FastifyInstance) => {
  const registerProfessionalController = new RegisterProfessionalController();
  const registerProfessionalOnboardingController =
    new RegisterProfessionalOnboardingController();
  const getProfessionalsByClinicController =
    new GetProfessionalsByClinicController();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();
  const clinicAuthorizationHeader = new CheckClinicUserMiddleware();

  fastify.route({
    url: "/professional/register",
    method: "POST",
    preHandler: [checkAuthenticated.execute, clinicAuthorizationHeader.execute],
    handler: registerProfessionalController.execute,
  });

  fastify.route({
    url: "/professional/onboarding/register",
    method: "POST",
    preHandler: [checkAuthenticated.execute],
    handler: registerProfessionalOnboardingController.execute,
  });

  fastify.route({
    url: "/professionals",
    method: "GET",
    preHandler: [checkAuthenticated.execute, clinicAuthorizationHeader.execute],
    handler: getProfessionalsByClinicController.execute,
  });
};

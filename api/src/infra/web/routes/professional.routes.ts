import { FastifyInstance } from "fastify";
import { RegisterProfessionalController } from "../controllers/professional/register.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic";

export const configure = (fastify: FastifyInstance) => {
  const registerProfessionalController = new RegisterProfessionalController();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();
  const clinicAuthorizationHeader = new CheckClinicUserMiddleware();

  fastify.route({
    url: "/professional/register",
    method: "POST",
    preHandler: [checkAuthenticated.execute, clinicAuthorizationHeader.execute],
    handler: registerProfessionalController.execute,
  });
};

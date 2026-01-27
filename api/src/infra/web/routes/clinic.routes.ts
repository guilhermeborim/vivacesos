import { FastifyInstance } from "fastify";
import { RegisterClinicController } from "../controllers/clinic/register.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";

export const configure = (fastify: FastifyInstance) => {
  const registerClinicController = new RegisterClinicController();
  const checkAuthenticationMiddleware = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/clinic/register",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: registerClinicController.execute,
  });
};

import { FastifyInstance } from "fastify";
import { RegisterPatientController } from "../controllers/patient/register";
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication";
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic";

export const configure = (fastify: FastifyInstance) => {
  const registerPatientController = new RegisterPatientController();
  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware();
  const checkClinicUserMiddleware = new CheckClinicUserMiddleware();

  fastify.route({
    url: "/patient",
    method: "POST",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: registerPatientController.execute,
  });
};

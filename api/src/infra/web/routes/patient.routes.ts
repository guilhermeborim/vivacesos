import { FastifyInstance } from "fastify";
import { GetPatientsByClinicController } from "../controllers/patient/getPatientsByClinic";
import { RegisterPatientController } from "../controllers/patient/register";
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication";
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic";

export const configure = (fastify: FastifyInstance) => {
  const registerPatientController = new RegisterPatientController();
  const getPatientsByClinicController = new GetPatientsByClinicController();
  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware();
  const checkClinicUserMiddleware = new CheckClinicUserMiddleware();

  fastify.route({
    url: "/clinic/patient",
    method: "POST",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: registerPatientController.execute,
  });

  fastify.route({
    url: "/clinic/patients",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getPatientsByClinicController.execute,
  });
};

import { FastifyInstance } from "fastify";
import { FindClinicIdController } from "../controllers/clinic/id.controller";
import { RegisterClinicController } from "../controllers/clinic/register.controller";
import { UpdateClinicController } from "../controllers/clinic/update.controller";
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication";

export const configure = (fastify: FastifyInstance) => {
  const registerClinicController = new RegisterClinicController();
  const findClinicByIdController = new FindClinicIdController();
  const updateClinicController = new UpdateClinicController();
  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware();

  fastify.route({
    url: "/clinic/register",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: registerClinicController.execute,
  });

  fastify.route({
    url: "/clinic/:clinicId",
    method: "GET",
    // preHandler: [checkAuthenticationMiddleware.execute],
    handler: findClinicByIdController.execute,
  });

  fastify.route({
    url: "/clinic/:clinicId",
    method: "PUT",
    // preHandler: [checkAuthenticationMiddleware.execute],
    handler: updateClinicController.execute,
  });
};

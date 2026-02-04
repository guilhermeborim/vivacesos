import { FastifyInstance } from "fastify";
import { BindClinicUserController } from "../controllers/clinic/bind";
import { GetClinicsByUserController } from "../controllers/clinic/getClinicsByUser";
import { GetProfessionalsByClinicController } from "../controllers/clinic/getProfessionalsByClinic";
import { GetUsersByClinicController } from "../controllers/clinic/getUsersByClinic";
import { FindClinicIdController } from "../controllers/clinic/id";
import { RegisterClinicController } from "../controllers/clinic/register";
import { RegisterProfessionalController } from "../controllers/clinic/registerProfessional";
import { UpdateClinicController } from "../controllers/clinic/update";
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication";
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic";

export const configure = (fastify: FastifyInstance) => {
  const registerClinicController = new RegisterClinicController();
  const findClinicByIdController = new FindClinicIdController();
  const updateClinicController = new UpdateClinicController();
  const getClinicsByUserController = new GetClinicsByUserController();
  const bindClinicUserController = new BindClinicUserController();
  const getUserByClinicController = new GetUsersByClinicController();
  const registerProfessionalController = new RegisterProfessionalController();
  const getProfessionalsByClinicController =
    new GetProfessionalsByClinicController();

  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware();
  const checkClinicUserMiddleware = new CheckClinicUserMiddleware();

  fastify.route({
    url: "/clinic/register",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: registerClinicController.execute,
  });

  fastify.route({
    url: "/clinic/:clinicId",
    method: "GET",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: findClinicByIdController.execute,
  });

  fastify.route({
    url: "/clinic/:clinicId",
    method: "PUT",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: updateClinicController.execute,
  });

  fastify.route({
    url: "/clinics",
    method: "GET",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: getClinicsByUserController.execute,
  });

  fastify.route({
    url: "/clinic/users",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: bindClinicUserController.execute,
  });

  fastify.route({
    url: "/clinic/users",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getUserByClinicController.execute,
  });

  fastify.route({
    url: "/clinic/professionals",
    method: "POST",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: registerProfessionalController.execute,
  });

  fastify.route({
    url: "/clinic/professionals",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getProfessionalsByClinicController.execute,
  });
};

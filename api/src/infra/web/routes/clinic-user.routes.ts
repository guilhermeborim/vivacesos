import { FastifyInstance } from "fastify";
import { BindClinicUserController } from "../controllers/clinicUser/bind.controller";
import { FindUsersByAnyClinicController } from "../controllers/clinicUser/findUsersByAnyClinic.controller";
import { FindUsersByClinicController } from "../controllers/clinicUser/findUsersByClinic.controller";
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication";
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic";

export const configure = (fastify: FastifyInstance) => {
  const bindClinicUserController = new BindClinicUserController();
  const findUsersByClinicController = new FindUsersByClinicController();
  const findUsersByAnyClinicController = new FindUsersByAnyClinicController();
  const checkAuthenticated = new CheckAuthenticationMiddleware();
  const clinicAuthorizationHeader = new CheckClinicUserMiddleware();

  fastify.route({
    url: "/clinic-user/bind",
    method: "POST",
    handler: bindClinicUserController.execute,
  });

  fastify.route({
    url: "/clinic-user/find-by-clinic",
    method: "GET",
    preHandler: [checkAuthenticated.execute, clinicAuthorizationHeader.execute],
    handler: findUsersByClinicController.execute,
  });

  fastify.route({
    url: "/clinic-user/find-by-any-clinic",
    method: "GET",
    preHandler: [checkAuthenticated.execute, clinicAuthorizationHeader.execute],
    handler: findUsersByAnyClinicController.execute,
  });
};

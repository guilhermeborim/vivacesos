import { FastifyInstance } from "fastify";
import { BindClinicUserController } from "../controllers/clinicUser/bind.controller";

export const configure = (fastify: FastifyInstance) => {
  const bindClinicUserController = new BindClinicUserController();

  fastify.route({
    url: "/clinic-user/bind",
    method: "POST",
    handler: bindClinicUserController.execute,
  });
};

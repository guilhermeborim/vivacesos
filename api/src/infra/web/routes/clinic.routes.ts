import { FastifyInstance } from "fastify";
import { RegisterClinicController } from "../controllers/clinic/register.controller";

export const configure = (fastify: FastifyInstance) => {
  const registerClinicController = new RegisterClinicController();

  fastify.route({
    url: "/clinic/register",
    method: "POST",
    handler: registerClinicController.execute,
  });
};

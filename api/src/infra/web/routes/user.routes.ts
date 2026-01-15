import { FastifyInstance } from "fastify";
import { RegisterController } from "../controllers/user/register.controller";

export const configure = (fastify: FastifyInstance) => {
  const registerController = new RegisterController();

  fastify.route({
    url: "/auth/register",
    method: "POST",
    handler: registerController.execute,
  });
};

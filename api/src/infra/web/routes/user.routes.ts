import { FastifyInstance } from "fastify";
import { AuthenticateController } from "../controllers/user/authenticate.controller";
import { RegisterController } from "../controllers/user/register.controller";

export const configure = (fastify: FastifyInstance) => {
  const authenticateController = new AuthenticateController();
  const registerController = new RegisterController();

  fastify.route({
    url: "/auth/register",
    method: "POST",
    handler: registerController.execute,
  });

  fastify.route({
    url: "/auth/login",
    method: "POST",
    handler: authenticateController.execute,
  });
};

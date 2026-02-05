import { FastifyInstance } from "fastify";
import { GetInviteByTokenController } from "../controllers/invite/getInviteByToken";
import { RegisterInviteController } from "../controllers/invite/invite";
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication";
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic";

export const configure = (fastify: FastifyInstance) => {
  const registerInviteController = new RegisterInviteController();
  const getInviteByTokenController = new GetInviteByTokenController();

  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware();
  const checkClinicUserMiddleware = new CheckClinicUserMiddleware();

  fastify.route({
    url: "/invite",
    method: "POST",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: registerInviteController.execute,
  });

  fastify.route({
    url: "/invite/:token",
    method: "GET",
    handler: getInviteByTokenController.execute,
  });
};

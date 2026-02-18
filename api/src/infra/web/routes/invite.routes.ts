import { FastifyInstance } from "fastify";
import { GetInviteByTokenController } from "../../../modules/invite/application/controllers/GetInviteByToken";
import { RegisterInviteController } from "../../../modules/invite/application/controllers/Invite";
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

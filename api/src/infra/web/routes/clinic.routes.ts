import { FastifyInstance } from "fastify"

import { BindClinicUserController } from "../../../modules/clinic/application/controllers/Bind"
import { FindClinicIdController } from "../../../modules/clinic/application/controllers/GetClinicById"
import { GetClinicsByUserController } from "../../../modules/clinic/application/controllers/GetClinicsByUser"
import { GetProfessionalsByClinicController } from "../../../modules/clinic/application/controllers/GetProfessionalsByClinic"
import { GetUsersByClinicController } from "../../../modules/clinic/application/controllers/GetUsersByClinic"
import { RegisterClinicController } from "../../../modules/clinic/application/controllers/Register"
import { RegisterProfessionalController } from "../../../modules/clinic/application/controllers/RegisterProfessional"
import { UpdateClinicController } from "../../../modules/clinic/application/controllers/Update"
import { UpdateClinicUserStatusController } from "../../../modules/clinicUser/application/controllers/UpdateStatus"
import { GetProfessionalByIdController } from "../../../modules/professional/application/controllers/GetById"
import { UpdateProfessionalController } from "../../../modules/professional/application/controllers/Update"
import { GetUserByIdController } from "../../../modules/users/application/controllers/GetById"
import { UpdateUserController } from "../../../modules/users/application/controllers/Update"
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication"
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic"

export const configure = (fastify: FastifyInstance) => {
  const registerClinicController = new RegisterClinicController()
  const findClinicByIdController = new FindClinicIdController()
  const updateClinicController = new UpdateClinicController()
  const getClinicsByUserController = new GetClinicsByUserController()
  const bindClinicUserController = new BindClinicUserController()
  const getUserByClinicController = new GetUsersByClinicController()
  const registerProfessionalController = new RegisterProfessionalController()
  const getProfessionalsByClinicController = new GetProfessionalsByClinicController()

  const updateProfessionalController = new UpdateProfessionalController()
  const getProfessionalByIdController = new GetProfessionalByIdController()
  const updateUserController = new UpdateUserController()
  const getUserByIdController = new GetUserByIdController()
  const updateClinicUserStatusController = new UpdateClinicUserStatusController()

  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware()
  const checkClinicUserMiddleware = new CheckClinicUserMiddleware()

  fastify.route({
    url: "/clinic/register",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: registerClinicController.execute,
  })

  fastify.route({
    url: "/clinic/:clinicId",
    method: "GET",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: findClinicByIdController.execute,
  })

  fastify.route({
    url: "/clinic/:clinicId",
    method: "PUT",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: updateClinicController.execute,
  })

  fastify.route({
    url: "/clinics",
    method: "GET",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: getClinicsByUserController.execute,
  })

  fastify.route({
    url: "/clinic/users",
    method: "POST",
    preHandler: [checkAuthenticationMiddleware.execute],
    handler: bindClinicUserController.execute,
  })

  fastify.route({
    url: "/clinic/users",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getUserByClinicController.execute,
  })

  fastify.route({
    url: "/clinic/users/:userId",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getUserByIdController.execute,
  })

  fastify.route({
    url: "/clinic/users/:userId",
    method: "PUT",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: updateUserController.execute,
  })

  fastify.route({
    url: "/clinic/users/:userId/status",
    method: "PATCH",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
      // checkPermissionsMiddleware.requirePermission(PERMISSIONS.USER_STATUS_CHANGE), // descomente quando quiser usar
    ],
    handler: updateClinicUserStatusController.execute,
  })

  fastify.route({
    url: "/clinic/professionals",
    method: "POST",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: registerProfessionalController.execute,
  })

  fastify.route({
    url: "/clinic/professionals",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getProfessionalsByClinicController.execute,
  })

  fastify.route({
    url: "/clinic/professionals/:professionalId",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getProfessionalByIdController.execute,
  })

  fastify.route({
    url: "/clinic/professionals/:professionalId",
    method: "PUT",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: updateProfessionalController.execute,
  })
}

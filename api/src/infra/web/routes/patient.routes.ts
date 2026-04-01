import { FastifyInstance } from "fastify"
import { GetPatientByIdController } from "../../../modules/patient/application/controllers/GetPatientById"
import { GetPatientsByClinicController } from "../../../modules/patient/application/controllers/getPatientsByClinic"
import { RegisterPatientController } from "../../../modules/patient/application/controllers/register"
import { UpdatePatientByClinicController } from "../../../modules/patient/application/controllers/Update"
import { CheckAuthenticationMiddleware } from "../middlewares/check-authentication"
import { CheckClinicUserMiddleware } from "../middlewares/check-clinic"

export const configure = (fastify: FastifyInstance) => {
  const registerPatientController = new RegisterPatientController()
  const getPatientsByClinicController = new GetPatientsByClinicController()
  const getPatientByIdController = new GetPatientByIdController()
  const updatePatientByClinicController = new UpdatePatientByClinicController()
  const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware()
  const checkClinicUserMiddleware = new CheckClinicUserMiddleware()

  fastify.route({
    url: "/clinic/patient",
    method: "POST",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: registerPatientController.execute,
  })

  fastify.route({
    url: "/clinic/patients",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getPatientsByClinicController.execute,
  })

  fastify.route({
    url: "/clinic/patients/:patientId",
    method: "GET",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: getPatientByIdController.execute,
  })

  fastify.route({
    url: "/clinic/patients/:patientId",
    method: "PUT",
    preHandler: [
      checkAuthenticationMiddleware.execute,
      checkClinicUserMiddleware.execute,
    ],
    handler: updatePatientByClinicController.execute,
  })
}

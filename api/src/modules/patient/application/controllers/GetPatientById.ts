import { FastifyReply, FastifyRequest } from "fastify"
import { GetPatientByIdService } from "../services/GetPatientById"

export class GetPatientByIdController {
  private patientLogic: GetPatientByIdService

  constructor() {
    this.patientLogic = new GetPatientByIdService()
  }

  execute = async (
    request: FastifyRequest<{ Params: { patientId: string } }>,
    reply: FastifyReply,
  ) => {
    const { patientId } = request.params

    if (!patientId) {
      reply.status(400).send({ message: "Nenhum ID de paciente fornecido" })
      return
    }

    const patient = await this.patientLogic.execute(request.clinicId, patientId)

    reply.send(patient)
  }
}

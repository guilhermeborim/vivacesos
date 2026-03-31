import { FastifyReply, FastifyRequest } from "fastify"
import { updatePatientBodySchema } from "../../../../infra/web/routes/schemas/patient/update.schema"
import { UpdatePatientService } from "../services/Update"

export class UpdatePatientByClinicController {
  private patientLogic: UpdatePatientService

  constructor() {
    this.patientLogic = new UpdatePatientService()
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

    const patientData = updatePatientBodySchema.parse(request.body)
    await this.patientLogic.execute(request.clinicId, patientId, patientData)

    reply.send()
  }
}

import { FastifyReply, FastifyRequest } from "fastify"
import { updateProfessionalBodySchema } from "../../../../infra/web/routes/schemas/professional/update.schema"
import { UpdateProfessionalService } from "../services/Update"

export class UpdateProfessionalController {
  private professionalLogic: UpdateProfessionalService

  constructor() {
    this.professionalLogic = new UpdateProfessionalService()
  }

  execute = async (
    request: FastifyRequest<{ Params: { professionalId: string } }>,
    reply: FastifyReply,
  ) => {
    const { professionalId } = request.params

    if (!professionalId) {
      reply.status(400).send({ message: "Nenhum ID de profissional fornecido" })
      return
    }

    const professionalData = updateProfessionalBodySchema.parse(request.body)
    await this.professionalLogic.execute(request.clinicId, professionalId, professionalData)

    reply.send()
  }
}

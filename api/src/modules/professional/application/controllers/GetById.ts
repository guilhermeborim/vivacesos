import { FastifyReply, FastifyRequest } from "fastify"
import { GetProfessionalByIdService } from "../services/GetById"

export class GetProfessionalByIdController {
  private professionalLogic: GetProfessionalByIdService

  constructor() {
    this.professionalLogic = new GetProfessionalByIdService()
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

    const professional = await this.professionalLogic.execute(professionalId)

    reply.send(professional)
  }
}

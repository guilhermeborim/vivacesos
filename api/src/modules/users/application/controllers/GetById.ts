import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserByIdService } from "../services/GetById"

export class GetUserByIdController {
  private getUserByIdLogic: GetUserByIdService

  constructor() {
    this.getUserByIdLogic = new GetUserByIdService()
  }

  execute = async (
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.params

    if (!userId) {
      reply.status(400).send({ message: "Nenhum ID de usuário fornecido" })
      return
    }

    const user = await this.getUserByIdLogic.execute(request.clinicId, userId)

    reply.send(user)
  }
}

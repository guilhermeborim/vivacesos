import { FastifyReply, FastifyRequest } from "fastify"
import { updateUserBodySchema } from "../../../../infra/web/routes/schemas/user/update.schema"
import { UpdateUserService } from "../services/Update"

export class UpdateUserController {
  private updateUserLogic: UpdateUserService

  constructor() {
    this.updateUserLogic = new UpdateUserService()
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

    const userData = updateUserBodySchema.parse(request.body)
    await this.updateUserLogic.execute(userId, userData)

    reply.send()
  }
}

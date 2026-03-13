// api/src/modules/clinicUser/application/controllers/UpdateStatus.ts
import { FastifyReply, FastifyRequest } from "fastify"
import { ClinicUserStatus } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers"
import { updateUserStatusBodySchema } from "../../../../infra/web/routes/schemas/clinicUser/update-status.schema"
import { UpdateClinicUserStatusService } from "../services/updateStatus"

export class UpdateClinicUserStatusController {
  private updateStatusLogic: UpdateClinicUserStatusService

  constructor() {
    this.updateStatusLogic = new UpdateClinicUserStatusService()
  }

  execute = async (
    request: FastifyRequest<{
      Params: { userId: string }
      Body: { status: ClinicUserStatus }
    }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.params
    const { status } = updateUserStatusBodySchema.parse(request.body)

    await this.updateStatusLogic.execute(
      request.clinicId,
      request.user.id, // requestingUserId — vem do token
      userId, // targetUserId — vem da URL
      status,
    )

    reply.status(204).send()
  }
}

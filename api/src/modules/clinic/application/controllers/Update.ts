import { FastifyReply, FastifyRequest } from "fastify";
import { updateClinicFormSchema } from "../../../../infra/web/routes/schemas/clinic/update.schema";
import { UpdateClinicService } from "../services/Update";
import { ClinicUpdateParams } from "../types";

export class UpdateClinicController {
  private clinicLogic: UpdateClinicService;

  constructor() {
    this.clinicLogic = new UpdateClinicService();
  }

  execute = async (
    request: FastifyRequest<{
      Body: ClinicUpdateParams;
      Params: { clinicId: string };
    }>,
    reply: FastifyReply,
  ) => {
    const clinicId = request.params.clinicId;

    if (!clinicId) {
      reply.status(400).send({ message: "Nenhum ID de clínica fornecido" });
      return;
    }

    const clinicData = updateClinicFormSchema.parse(request.body);
    await this.clinicLogic.execute(clinicId, clinicData);

    reply.send();
  };
}

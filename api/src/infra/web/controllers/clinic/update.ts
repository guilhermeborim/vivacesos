import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateClinicService } from "../../../../domain/clinic/services/update";
import { ClinicUpdateParams } from "../../../database/typeorm/sass/interfaces/clinic";
import { updateClinicFormSchema } from "../../routes/schemas/clinic/update.schema";

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

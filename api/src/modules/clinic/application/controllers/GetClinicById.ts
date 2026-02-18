import { FastifyReply, FastifyRequest } from "fastify";
import { FindClinicIdService } from "../services/GetById";

export class FindClinicIdController {
  private clinicLogic: FindClinicIdService;

  constructor() {
    this.clinicLogic = new FindClinicIdService();
  }

  execute = async (
    request: FastifyRequest<{ Params: { clinicId: string } }>,
    reply: FastifyReply,
  ) => {
    const clinicId = request.params.clinicId;

    if (!clinicId) {
      return reply
        .status(400)
        .send({ message: "Nenhum ID de clínica fornecido" });
    }
    const clinic = await this.clinicLogic.execute(clinicId);

    reply.send(clinic);
  };
}

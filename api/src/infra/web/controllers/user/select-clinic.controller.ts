import { FastifyReply, FastifyRequest } from "fastify";
import { SelectClinicService } from "../../../../domain/user/services/select-clinic";

export class SelectClinicController {
  private selectClinicLogic: SelectClinicService;

  constructor() {
    this.selectClinicLogic = new SelectClinicService();
  }

  execute = async (
    request: FastifyRequest<{ Body: { clinicId: string } }>,
    reply: FastifyReply,
  ) => {
    const clinicId = request.body.clinicId;

    const accessToken = await this.selectClinicLogic.execute(
      clinicId as string,
      request.user.id,
    );

    reply
      .setCookie("token", accessToken.accessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 15, // 15 minutos
        sameSite: process.env.NODE_ENV === "PROD" ? "none" : "lax",
        secure: process.env.NODE_ENV === "PROD" ? true : false,
      })
      .send();
  };
}

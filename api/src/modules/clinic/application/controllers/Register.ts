import { FastifyReply, FastifyRequest } from "fastify";
import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import { registerClinicBodySchema } from "../../../../infra/web/routes/schemas/clinic/register.schema";
import { BindClinicUserService } from "../../../clinicUser/application/services/Bind";
import { RegisterClinicService } from "../services/Register";
import { ClinicCreateParams } from "../types";

export class RegisterClinicController {
  private clinicLogic: RegisterClinicService;
  private clinicUserLogic: BindClinicUserService;

  constructor() {
    this.clinicLogic = new RegisterClinicService();
    this.clinicUserLogic = new BindClinicUserService();
  }

  execute = async (
    request: FastifyRequest<{ Body: ClinicCreateParams }>,
    reply: FastifyReply,
  ) => {
    const clinicData = registerClinicBodySchema.parse(request.body);
    const clinic = await this.clinicLogic.execute(clinicData);

    const clinicUserData = {
      clinicId: clinic.id,
      userId: request.user.id,
      role: ClinicUserRole.ADMIN,
      status: ClinicUserStatus.ATIVO,
    };

    const { token } = await this.clinicUserLogic.execute(clinicUserData);

    if (token) {
      reply
        .setCookie("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 15, // 15 minutos
          sameSite: process.env.NODE_ENV === "PROD" ? "none" : "lax",
          secure: process.env.NODE_ENV === "PROD" ? true : false,
        })
        .send(clinic);
    }
    reply.send(clinic);
  };
}

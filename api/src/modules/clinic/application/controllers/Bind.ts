import { FastifyReply, FastifyRequest } from "fastify";
import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import { bindClinicUserBodySchema } from "../../../../infra/web/routes/schemas/clinicUser/bind.schema";
import { BindClinicUserService } from "../../../clinicUser/application/services/Bind";
import { BindClinicUsersParams } from "../../../clinicUser/application/types";

export class BindClinicUserController {
  private clinicUserLogic: BindClinicUserService;

  constructor() {
    this.clinicUserLogic = new BindClinicUserService();
  }

  execute = async (
    request: FastifyRequest<{
      Body: BindClinicUsersParams;
    }>,
    reply: FastifyReply,
  ) => {
    const clinicUserData = bindClinicUserBodySchema.parse(request.body);

    if (clinicUserData.role === undefined || clinicUserData.role === null) {
      clinicUserData.role = ClinicUserRole.ADMIN;
      clinicUserData.status = ClinicUserStatus.ATIVO;
    }

    const clinicUser = await this.clinicUserLogic.execute(clinicUserData);

    reply.send(clinicUser);
  };
}

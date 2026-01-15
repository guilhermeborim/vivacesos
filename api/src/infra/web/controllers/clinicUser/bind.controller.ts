import { FastifyReply, FastifyRequest } from "fastify";
import { BindClinicUserService } from "../../../../domain/clinicUser/bind";
import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../database/typeorm/sass/entities/ClinicUsers";
import { BindClinicUsersParams } from "../../../database/typeorm/sass/repositories/interfaces/clinic-users-repository.interface";
import { bindClinicUserBodySchema } from "../../routes/schemas/clinicUser/bind.schema";

export class BindClinicUserController {
  private clinicUserLogic: BindClinicUserService;

  constructor() {
    this.clinicUserLogic = new BindClinicUserService();
  }

  execute = async (
    request: FastifyRequest<{
      Body: BindClinicUsersParams;
    }>,
    reply: FastifyReply
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

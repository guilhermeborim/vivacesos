import { FastifyRequest } from "fastify";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { ClinicUsersTypeormRepository } from "../../database/typeorm/sass/repositories/clinic-users.repository";

export class CheckClinicUserMiddleware {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  execute = async (request: FastifyRequest) => {
    const clinicAuthorization = request.clinicId;

    if (!clinicAuthorization) {
      throw new Error("Cabeçalho de autorização da clínica não fornecido");
    }

    const clinicUSer = await this.clinicUserRepository.getUserBindedClinic(
      clinicAuthorization as string,
      request.user.id,
    );

    if (!clinicUSer) {
      throw new UnauthenticatedError(
        "Usuário não autorizado para acessar esta clínica!",
      );
    }
    return;
  };
}

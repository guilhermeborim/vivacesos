import { FastifyRequest } from "fastify";
import { ClinicUsersTypeormRepository } from "../../../modules/clinicUser/database/repositories/ClinicUserTypeormRepository";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";

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

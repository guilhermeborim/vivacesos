import { FastifyRequest } from "fastify";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { ClinicUsersTypeormRepository } from "../../database/typeorm/sass/repositories/clinic-users.repository";

export class CheckClinicUserMiddleware {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  execute = async (request: FastifyRequest) => {
    const clinicAuthorizationHeader = request.headers["x-clinic-authorization"];

    if (!clinicAuthorizationHeader) {
      throw new Error("Cabeçalho de autorização da clínica não fornecido");
    }

    const clinicUSer = await this.clinicUserRepository.findUserBindedClinic(
      clinicAuthorizationHeader as string,
      request.user.id,
    );

    if (!clinicUSer) {
      throw new UnauthenticatedError(
        "Usuário não autorizado para acessar esta clínica!",
      );
    }

    request.clinicId = clinicAuthorizationHeader as string;
    request.userRole = clinicUSer.role;
  };
}

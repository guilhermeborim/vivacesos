import { FastifyRequest } from "fastify"
import { ClinicUsersTypeormRepository } from "../../../modules/clinicUser/database/repositories/ClinicUserTypeormRepository"
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error"
import { ClinicUserStatus } from "../../database/typeorm/sass/entities/ClinicUsers"

export class CheckClinicUserMiddleware {
  private clinicUserRepository: ClinicUsersTypeormRepository

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository()
  }

  execute = async (request: FastifyRequest) => {
    const clinicAuthorization = request.clinicId

    if (!clinicAuthorization) {
      throw new Error("Cabeçalho de autorização da clínica não fornecido")
    }

    const clinicUser = await this.clinicUserRepository.getUserBindedClinic(
      clinicAuthorization as string,
      request.user.id,
    )

    if (!clinicUser) {
      throw new UnauthenticatedError("Usuário não autorizado para acessar esta clínica!")
    }

    if (clinicUser.status === ClinicUserStatus.INATIVO) {
      throw new UnauthenticatedError(
        "Usuário INATIVADO para acessar está clínica. Contate o ADMINISTRADOR!",
      )
    }

    if (clinicUser.status === ClinicUserStatus.BLOQUEADO) {
      throw new UnauthenticatedError(
        "Usuário BLOQUEADO para acessar está clínica. Contate o ADMINISTRADOR!",
      )
    }

    if (clinicUser.status === ClinicUserStatus.INVITADO) {
      throw new UnauthenticatedError(
        "Usuário ainda não aceitou o convite para acessar está clínica. Verifique seu E-mail!",
      )
    }

    return
  }
}

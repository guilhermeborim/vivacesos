import { NotFoundError } from "../../../../shared/errors/not-found.error"
import { ClinicUsersTypeormRepository } from "../../../clinicUser/database/repositories/ClinicUserTypeormRepository"
import { UserTypeormRepository } from "../../database/repositories/UserTypeormRepository"

export class GetUserByIdService {
  private userRepository: UserTypeormRepository
  private clinicUserRepository: ClinicUsersTypeormRepository

  constructor() {
    this.userRepository = new UserTypeormRepository()
    this.clinicUserRepository = new ClinicUsersTypeormRepository()
  }

  async execute(clinicId: string, userId: string) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!")
    }

    const clinicUser = await this.clinicUserRepository.getUserBindedClinic(
      clinicId,
      userId,
    )

    if (!clinicUser) {
      throw new NotFoundError("Vínculo do usuário com a clínica não encontrado!")
    }

    return {
      id: user.id,
      role: clinicUser.role,
      status: clinicUser.status,
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}

import { NotFoundError } from "../../../../shared/errors/not-found.error"
import { UserTypeormRepository } from "../../database/repositories/UserTypeormRepository"
import { UserUpdateParams } from "../types"

export class UpdateUserService {
  private userRepository: UserTypeormRepository

  constructor() {
    this.userRepository = new UserTypeormRepository()
  }

  async execute(userId: string, data: UserUpdateParams): Promise<void> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundError("Usuário não encontrado!")
    }

    await this.userRepository.updateUser(userId, data)
  }
}

import { hashSync } from "bcrypt";
import { User } from "../../../infra/database/typeorm/sass/entities/User";
import { UserCreateParams } from "../../../infra/database/typeorm/sass/interfaces/user";
import { UserTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/user.repository";
import { ConflictError } from "../../../shared/errors/conflict.error";

export class RegisterService {
  private authRepository: UserTypeormRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
  }

  async execute(user: UserCreateParams): Promise<User> {
    const userExists = await this.authRepository.findByEmail(user.email);

    if (userExists) {
      throw new ConflictError("E-mail já está cadastrado!");
    }

    const encryptedPassword = hashSync(user.password, 10);

    const userCreated = await this.authRepository.createUser({
      ...user,
      password: encryptedPassword,
    });

    delete userCreated.password;

    return userCreated;
  }
}

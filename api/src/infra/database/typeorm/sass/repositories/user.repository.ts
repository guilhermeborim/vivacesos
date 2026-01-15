import { Repository } from "typeorm";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { SassDataSource } from "../data-source";
import { User } from "../entities/User";
import {
  CreateUserParams,
  UserRepositoryInterface,
} from "./interfaces/user-repository.interface";

export class UserTypeormRepository implements UserRepositoryInterface {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = SassDataSource.getRepository(User);
  }

  async createUser(user: CreateUserParams): Promise<User> {
    try {
      const userCreated = await this.userRepository.save(user);
      return userCreated;
    } catch (error) {
      throw new DatabaseError("Falha ao criar usuário!", error);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar usuário!", error);
    }
  }
}

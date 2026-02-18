import { hashSync } from "bcrypt";
import { ClinicUserStatus } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import {
  User,
  UserOnboardingStep,
} from "../../../../infra/database/typeorm/sass/entities/User";
import { ClinicUsersTypeormRepository } from "../../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { InviteTypeormRepository } from "../../../../infra/database/typeorm/sass/repositories/invite.repository";
import { ConflictError } from "../../../../shared/errors/conflict.error";
import { ForbiddenError } from "../../../../shared/errors/forbidden.error";
import { UserTypeormRepository } from "../../database/repositories/UserTypeormRepository";
import { UserCreateParams } from "../types";

export class RegisterService {
  private authRepository: UserTypeormRepository;
  private inviteRepository: InviteTypeormRepository;
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.inviteRepository = new InviteTypeormRepository();
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(user: UserCreateParams): Promise<User> {
    const userExists = await this.authRepository.findByEmail(user.email);

    if (userExists) {
      throw new ConflictError("E-mail já está cadastrado!");
    }

    const inviteExist = await this.inviteRepository.getInviteByEmail(
      user.email,
    );

    if (inviteExist && inviteExist.expiresAt < new Date()) {
      throw new ForbiddenError("Convite expirado, solicite outro!");
    }

    const encryptedPassword = hashSync(user.password, 10);

    const userData = {
      ...user,
      password: encryptedPassword,
    };

    const userCreated = await this.authRepository.createUser(
      userData,
      inviteExist ? UserOnboardingStep.FINISHED : null,
    );

    if (userCreated && inviteExist) {
      const clinicUser = {
        userId: userCreated.id,
        clinicId: inviteExist.clinicId,
        role: inviteExist.role,
        status: ClinicUserStatus.ATIVO,
      };

      await this.clinicUserRepository.bindClinicUser(clinicUser);
      await this.inviteRepository.updateInvite(inviteExist.id);
    }

    delete userCreated.password;

    return userCreated;
  }
}

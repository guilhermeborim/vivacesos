import {
  BindClinicUsersParams,
  ClinicUserResponse,
} from "../../../infra/database/typeorm/sass/interfaces/clinicUser";
import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { UserTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/user.repository";
import { ConflictError } from "../../../shared/errors/conflict.error";
import { JWTService } from "../../../shared/services/jwt.service";

export class BindClinicUserService {
  private clinicUserRepository: ClinicUsersTypeormRepository;
  private userRepository: UserTypeormRepository;
  private JWTService: JWTService;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
    this.userRepository = new UserTypeormRepository();
    this.JWTService = new JWTService();
  }

  async execute(
    clinicUser: BindClinicUsersParams,
  ): Promise<ClinicUserResponse> {
    const userBindedClinic =
      await this.clinicUserRepository.getUserBindedClinic(
        clinicUser.clinicId,
        clinicUser.userId,
      );

    if (userBindedClinic) {
      throw new ConflictError("Usuário já está vinculado a clínica!");
    }

    const findClinicsUserBefore =
      await this.clinicUserRepository.getUsersByClinic(clinicUser.userId);

    const clinicUserBinded =
      await this.clinicUserRepository.bindClinicUser(clinicUser);

    const user = await this.userRepository.findById(clinicUser.userId);

    if (findClinicsUserBefore.length === 0 && user) {
      const accessToken = this.JWTService.generateAccessToken({
        email: user.email,
        id: user.id,
        clinicId: clinicUserBinded.clinicId,
      });

      return {
        token: accessToken,
        clinicUser: clinicUserBinded,
      };
    }

    return {
      clinicUser: clinicUserBinded,
    };
  }
}

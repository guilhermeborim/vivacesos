import { ConflictError } from "../../../../shared/errors/conflict.error";
import { JWTService } from "../../../../shared/services/jwt.service";
import { UserTypeormRepository } from "../../../users/database/repositories/UserTypeormRepository";
import { ClinicUsersTypeormRepository } from "../../database/repositories/ClinicUserTypeormRepository";
import { ClinicUserResponse } from "../dtos/ClinicUserResponse";
import { BindClinicUsersParams } from "../types";

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

      // return {
      //   token: accessToken,
      //   clinicUser: clinicUserBinded,
      // };

      return {
        token: accessToken,
        clinicId: clinicUserBinded.clinicId,
        role: clinicUserBinded.role,
        status: clinicUserBinded.status,
        userId: clinicUserBinded.userId,
      };
    }

    // return {
    //   clinicUser: clinicUserBinded,
    // };

    return {
      clinicId: clinicUserBinded.clinicId,
      role: clinicUserBinded.role,
      status: clinicUserBinded.status,
      userId: clinicUserBinded.userId,
    };
  }
}

import { ClinicUsersTypeormRepository } from "../../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { JWTService } from "../../../../shared/services/jwt.service";
import { UserTypeormRepository } from "../../database/repositories/UserTypeormRepository";

export class SelectClinicService {
  private clinicUserRepository: ClinicUsersTypeormRepository;
  private UserRepository: UserTypeormRepository;
  private JWTService: JWTService;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
    this.UserRepository = new UserTypeormRepository();
    this.JWTService = new JWTService();
  }

  async execute(clinicId: string, userId: string) {
    const user = await this.UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const clinicUser = await this.clinicUserRepository.getUserBindedClinic(
      clinicId,
      userId,
    );

    if (!clinicUser) {
      throw new Error("Usuário não vinculado à clínica");
    }

    const accessToken = this.JWTService.generateAccessToken({
      id: user.id,
      email: user.email,
      clinicId: clinicUser.clinicId,
    });

    return {
      accessToken,
    };
  }
}

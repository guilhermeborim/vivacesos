import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { UserTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/user.repository";
import { JWTService } from "../../../shared/services/jwt.service";

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

    const clinicUser = await this.clinicUserRepository.findUserBindedClinic(
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

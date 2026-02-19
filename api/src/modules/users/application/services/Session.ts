import { ROLE_PERMISSIONS } from "../../../../shared/permissions/role-permissions";
import { ClinicUsersTypeormRepository } from "../../../clinicUser/database/repositories/ClinicUserTypeormRepository";
import { UserTypeormRepository } from "../../database/repositories/UserTypeormRepository";
import { GetSessionUserResponse } from "../dtos/UserResponse";
import { GetSessionUserMapper } from "../mappers/UserMapper";

export class SessionService {
  private clinicUserRepository: ClinicUsersTypeormRepository;
  private UserRepository: UserTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
    this.UserRepository = new UserTypeormRepository();
  }

  async execute(
    clinicId: string,
    userId: string,
  ): Promise<GetSessionUserResponse> {
    const user = await this.UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const clinicUsers =
      await this.clinicUserRepository.getClinicsByUser(userId);

    const clinics = clinicUsers.map((cu) => ({
      clinicId: cu.clinicId,
      name: cu.clinic.name,
    }));

    let activeClinic = clinics.length === 1 ? clinics[0] : null;
    let role = clinics.length === 1 ? clinicUsers[0].role : null;

    if (clinicId) {
      const clinicUser = clinicUsers.find((cu) => cu.clinicId === clinicId);

      if (!clinicUser) {
        throw new Error("Usuário não vinculado à clínica");
      }

      role = clinicUser.role;
      activeClinic = {
        clinicId: clinicUser.clinicId,
        name: clinicUser.clinic.name,
      };
    }

    const permissions = ROLE_PERMISSIONS[role] || null;

    return GetSessionUserMapper.toResponse({
      user,
      clinicUsers,
      activeClinic,
      role,
      permissions,
    });
  }
}

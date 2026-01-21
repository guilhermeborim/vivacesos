import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { UserTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/user.repository";
import { ROLE_PERMISSIONS } from "../../../shared/permissions/role-permissions";

export class SessionService {
  private clinicUserRepository: ClinicUsersTypeormRepository;
  private UserRepository: UserTypeormRepository;
  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
    this.UserRepository = new UserTypeormRepository();
  }

  async execute(clinicId: string, userId: string) {
    if (!clinicId) {
      const user = await this.UserRepository.findById(userId);
      return {
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        },
        clinic: null,
        role: null,
        permissions: [],
      };
    }
    const clinicUser = await this.clinicUserRepository.findUserBindedClinic(
      clinicId,
      userId,
    );

    const role = clinicUser?.role;

    const permissions = ROLE_PERMISSIONS[role];

    return {
      user: {
        id: clinicUser?.userId,
        name: clinicUser?.user.name,
        email: clinicUser?.user.email,
      },
      clinic: {
        id: clinicUser?.clinicId,
        name: clinicUser?.clinic.name,
      },
      role: role,
      permissions: permissions,
    };
  }
}

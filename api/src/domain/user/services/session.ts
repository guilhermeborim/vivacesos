import { ClinicUsersTypeormRepository } from "../../../infra/database/typeorm/sass/repositories/clinic-users.repository";
import { ROLE_PERMISSIONS } from "../../../shared/permissions/role-permissions";

export class SessionService {
  private clinicUserRepository: ClinicUsersTypeormRepository;

  constructor() {
    this.clinicUserRepository = new ClinicUsersTypeormRepository();
  }

  async execute(clinicId: string, userId: string) {
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

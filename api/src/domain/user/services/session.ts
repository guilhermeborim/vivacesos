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
    const user = await this.UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const clinicUsers =
      await this.clinicUserRepository.findUserBindedAnyClinics(userId);

    const clinics = clinicUsers.map((cu) => ({
      clinicId: cu.clinicId,
      name: cu.clinic.name,
    }));

    let activeClinic = clinics.length === 1 ? clinics[0] : null;
    let role = clinics.length === 1 ? clinicUsers[0].role : null;
    let permissions = ROLE_PERMISSIONS[role] || null;

    if (clinicId) {
      const clinicUser = clinicUsers.find((cu) => cu.clinicId === clinicId);

      if (!clinicUser) {
        throw new Error("Usuário não vinculado à clínica");
      }

      role = clinicUser.role;
      permissions = ROLE_PERMISSIONS[role];
      activeClinic = {
        clinicId: clinicUser.clinicId,
        name: clinicUser.clinic.name,
      };
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        onboardingStep: user.onboardingStep,
      },
      clinics,
      activeClinic,
      role,
      permissions,
    };
  }
}

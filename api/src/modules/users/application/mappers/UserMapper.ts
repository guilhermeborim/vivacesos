import { ClinicUser } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import { User } from "../../../../infra/database/typeorm/sass/entities/User";
import { GetSessionUserResponse, UserResponse } from "../dtos/UserResponse";

export class UserMapper {
  static toResponse(user: User): UserResponse {
    return {
      name: user.name,
      email: user.email,
      active: user.active,
      emailVerified: user.emailVerified,
      onboardingStep: user.onboardingStep,
      id: user.id,
    };
  }
}

export class GetSessionUserMapper {
  static toResponse(params: {
    user: User;
    clinicUsers: ClinicUser[];
    activeClinic: { clinicId: string; name: string } | null;
    role: string | null;
    permissions: string[] | null;
  }): GetSessionUserResponse {
    return {
      user: {
        id: params.user.id,
        name: params.user.name,
        email: params.user.email,
        onboardingStep: params.user.onboardingStep,
      },
      clinics: params.clinicUsers.map((cu) => ({
        clinicId: cu.clinicId,
        name: cu.clinic.name,
      })),
      activeClinic: params.activeClinic,
      role: params.role,
      permissions: params.permissions,
    };
  }
}

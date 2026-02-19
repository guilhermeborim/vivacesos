import { ClinicUser } from "../../../../infra/database/typeorm/sass/entities/ClinicUsers";
import {
  BindClinicUserResponse,
  GetClinicsByUserResponse,
  GetUsersByClinicResponse,
} from "../dtos/ClinicUserResponse";

export class GetClinicsByUserMapper {
  static toResponse(clinicUser: ClinicUser): GetClinicsByUserResponse {
    return {
      id: clinicUser.id,
      role: clinicUser.role,
      status: clinicUser.status,
      clinic: {
        name: clinicUser.clinic.name,
        city: clinicUser.clinic.city,
        clinicId: clinicUser.clinicId,
      },
    };
  }
}

export class BindClinicUserMapper {
  static toResponse(clinicUser: ClinicUser): BindClinicUserResponse {
    return {
      clinicId: clinicUser.clinicId,
      role: clinicUser.role,
      status: clinicUser.status,
      userId: clinicUser.userId,
    };
  }
}

export class GetUsersByClinicMapper {
  static toResponse(clinicUser: ClinicUser): GetUsersByClinicResponse {
    return {
      role: clinicUser.role,
      status: clinicUser.status,
      user: {
        email: clinicUser.user.email,
        name: clinicUser.user.name,
        userId: clinicUser.userId,
      },
      id: clinicUser.id,
    };
  }
}

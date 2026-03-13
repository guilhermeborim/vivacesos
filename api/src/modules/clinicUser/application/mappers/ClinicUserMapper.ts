import {
  ClinicUser,
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers"
import { decrypt } from "../../../../shared/utils/crypto"
import {
  BindClinicUserResponse,
  GetClinicsByUserResponse,
  GetUsersByClinicResponse,
} from "../dtos/ClinicUserResponse"

export class GetClinicsByUserMapper {
  static toResponse(clinicUser: ClinicUser): GetClinicsByUserResponse {
    return {
      clinicUserId: clinicUser.id,
      role: clinicUser.role,
      status: clinicUser.status,
      clinic: {
        name: clinicUser.clinic.name,
        city: clinicUser.clinic.city,
        clinicId: clinicUser.clinicId,
        cnpj: decrypt(clinicUser.clinic.cnpj),
      },
    }
  }
}

export class BindClinicUserMapper {
  static toResponse(clinicUser: ClinicUser): BindClinicUserResponse {
    return {
      clinicId: clinicUser.clinicId,
      role: clinicUser.role,
      status: clinicUser.status,
      userId: clinicUser.userId,
    }
  }
}

type GetUsersByClinicRaw = {
  clinicUserId: string
  userId: string | null
  role: ClinicUserRole
  status: ClinicUserStatus
  createdAt: Date
  user: {
    id: string
    name: string
    email: string
  } | null
  invite: {
    email: string
    token: string
    accepted: boolean
    expiresAt: Date
  } | null
}

export class GetUsersByClinicMapper {
  static toResponse(raw: GetUsersByClinicRaw): GetUsersByClinicResponse {
    return {
      clinicUserId: raw.clinicUserId,
      userId: raw.userId ?? null,
      role: raw.role,
      status: raw.status,
      createdAt: raw.createdAt,
      user: raw.user
        ? {
            userId: raw.user.id,
            name: raw.user.name,
            email: raw.user.email,
          }
        : null,
      invite: raw.invite ?? null,
    }
  }
}

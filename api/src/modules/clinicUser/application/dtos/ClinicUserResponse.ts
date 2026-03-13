import {
  ClinicUserRole,
  ClinicUserStatus,
} from "../../../../infra/database/typeorm/sass/entities/ClinicUsers"

export type BindClinicUserResponse = {
  token?: string
  clinicId: string
  role: ClinicUserRole
  status: ClinicUserStatus
  userId: string
}

export type ClinicUserResponse = {
  userId: string
  clinicId: string
  role: ClinicUserRole
  status: ClinicUserStatus
  token?: string
  clinic?: {
    name?: string
  }
  user?: {
    name?: string
    email?: string
  }
}

export type GetUsersByClinicResponse = {
  clinicUserId: string
  userId: string | null
  role: ClinicUserRole
  status: ClinicUserStatus
  createdAt: Date
  user: {
    userId: string
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

export type GetClinicsByUserResponse = {
  clinicUserId: string
  role: ClinicUserRole
  status: ClinicUserStatus
  clinic: {
    name: string
    clinicId: string
    city: string
    cnpj: string
  }
}

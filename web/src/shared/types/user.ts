import { ClinicUserStatus, Role } from "../enums"

export type User = {
  clinicUserId: string
  role: Role
  status: ClinicUserStatus
  user: {
    userId: string
    name: string
    email: string
  }
  invite: {
    email: string
    accepted: boolean
    expiresAt: Date
  }
}

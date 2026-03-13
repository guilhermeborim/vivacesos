import { ClinicUserRole } from "./roles"

export const PERMISSIONS = {
  PROFESSIONAL_CREATE: "PROFESSIONAL_CREATE",
  USER_STATUS_CHANGE: "USER_STATUS_CHANGE",
}

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export const ROLE_PERMISSIONS: Record<ClinicUserRole, Permission[]> = {
  ADMIN: [PERMISSIONS.PROFESSIONAL_CREATE, PERMISSIONS.USER_STATUS_CHANGE],
  PROFESSIONAL: [],
  RECEPCIONISTA: [],
}

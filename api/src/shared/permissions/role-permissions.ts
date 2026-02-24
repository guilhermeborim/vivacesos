import { ClinicUserRole } from "./roles"

export const PERMISSIONS = {
  PROFESSIONAL_CREATE: "PROFESSIONAL_CREATE",
}

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export const ROLE_PERMISSIONS: Record<ClinicUserRole, Permission[]> = {
  ADMIN: [PERMISSIONS.PROFESSIONAL_CREATE],
  PROFESSIONAL: [],
  RECEPCIONISTA: [],
}

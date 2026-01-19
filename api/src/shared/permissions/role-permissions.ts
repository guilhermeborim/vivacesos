import { Permission, PERMISSIONS } from "../../../../shared/permissions";
import { ClinicUserRole } from "./roles";

export const ROLE_PERMISSIONS: Record<ClinicUserRole, Permission[]> = {
  ADMIN: [PERMISSIONS.PROFESSIONAL_CREATE],
  PROFESSIONAL: [],
  RECEPCIONISTA: [],
};

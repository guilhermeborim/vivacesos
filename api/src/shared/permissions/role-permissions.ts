import { Permission } from "./permissions";
import { ClinicUserRole } from "./roles";

export const ROLE_PERMISSIONS: Record<ClinicUserRole, Permission[]> = {
  ADMIN: [Permission.PROFESSIONAL_CREATE],
  PROFESSIONAL: [],
  RECEPCIONISTA: [],
};

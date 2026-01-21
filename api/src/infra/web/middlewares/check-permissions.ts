import { FastifyRequest } from "fastify";
import { Permission } from "../../../../../shared/permissions";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";
import { ROLE_PERMISSIONS } from "../../../shared/permissions/role-permissions";
import { ClinicUserRole } from "../../../shared/permissions/roles";

export class CheckPermissionsMiddleware {
  private permissionRepository: typeof ROLE_PERMISSIONS;

  constructor() {
    this.permissionRepository = ROLE_PERMISSIONS;
  }

  hasPermission(role: ClinicUserRole, permission: Permission): boolean {
    const permissions =
      this.permissionRepository[role]?.includes(permission) || false;

    return permissions;
  }

  requirePermission(permission: Permission) {
    return (request: FastifyRequest) => {
      const userRole: ClinicUserRole = request.userRole;

      if (!this.hasPermission(userRole, permission)) {
        throw new ForbiddenError(
          "Usuário não possui permissão para acessar este recurso.",
        );
      }
    };
  }
}

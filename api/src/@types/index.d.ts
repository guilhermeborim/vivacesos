import "fastify";
import { UserResponse } from "../modules/users/application/dtos/UserResponse";
import { ClinicUserRole } from "../shared/permissions/roles";

declare module "fastify" {
  interface FastifyRequest {
    user: UserResponse;
    clinicId?: string;
    userRole?: ClinicUserRole;
  }
}

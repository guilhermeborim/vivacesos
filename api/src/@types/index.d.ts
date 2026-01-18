import "fastify";
import { User } from "../infra/database/typeorm/sass/entities/User";
import { ClinicUserRole } from "../shared/permissions/roles";

declare module "fastify" {
  interface FastifyRequest {
    user: User;
    clinicId?: string;
    userRole?: ClinicUserRole;
  }
}

import "fastify";
import { User } from "../infra/database/typeorm/sass/entities/User";

declare module "fastify" {
  interface FastifyRequest {
    user: User;
    clinicId?: string;
  }
}

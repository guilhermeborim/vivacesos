import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(cors);
};

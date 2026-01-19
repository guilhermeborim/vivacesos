import cookie from "@fastify/cookie";
import { FastifyInstance } from "fastify";

export const register = async (fastify: FastifyInstance) => {
  await fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET,
    parseOptions: {
      sameSite: "lax",
      secure: false,
    },
  });
};

import { FastifyInstance, RouteHandler, RouteOptions } from "fastify"

export default function router (fastify: FastifyInstance, opts: RouteOptions, done: RouteHandler) {
    fastify.get("/", async (request, reply) => {
        return { hello: "world1" };
      });
  }
  
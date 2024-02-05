import Fastify from "fastify";
import { fastifyEnv, options } from "./plugins/config.js";
import { logger } from "./plugins/logger.js";
import router from "./routes/index.js";

const server = Fastify({ logger });

server.register(fastifyEnv, options);
server.register(router, { prefix: "/v1" });
await server.after();

const start = async () => {
  try {
    await server.listen({ port: Number(process.env.PORT) || 8080 });
  } catch (err) {
    server.log.error(err);
  }
};

start();

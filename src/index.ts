import Fastify from "fastify";
import { fastifyEnv, options } from "./plugins/config.js";
import { logger } from "./plugins/logger.js";
import router from "./routes/index.js";

const fastify = Fastify({ logger });

fastify.register(fastifyEnv, options);
await fastify.after();

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) || 8080 });
  } catch (err) {
    fastify.log.error(err);
  }
};

start();

import Fastify from "fastify";
import { fastifyEnv, options } from "./plugins/config.js";
import { logger } from "./plugins/logger.js";
import router from "./routes/index.js";
import statusCodes from "./constants/status-codes.js";
import { replaceSlashesWithDots } from "./utils/string-formaters.js";

const { ERROR500 } = statusCodes;

const server = Fastify({ logger });

//the default error handler
server.setErrorHandler((error, _request, reply) => {
  reply
    .status(error.statusCode || ERROR500.statusCode)
    .send({
      message: replaceSlashesWithDots(error.message) || ERROR500.message,
    });
});

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

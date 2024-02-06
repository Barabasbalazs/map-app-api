import Fastify from "fastify";
import fp from "fastify-plugin";
import { fastifyEnv, options } from "./plugins/config.js";
import { logger } from "./plugins/logger.js";
import mongoosePlugin from "./plugins/db-connection.js";
import router from "./routes/index.js";
import statusCodes from "./constants/status-codes.js";
import { replaceSlashesWithDots } from "./utils/string-formaters.js";

const { ERROR400 } = statusCodes;

const server = Fastify({ logger });

//the default error handler
server.setErrorHandler((error, _request, reply) => {
  //validation errors overwwrite
  if (error.code === "FST_ERR_VALIDATION") {
    reply.status(error.statusCode || ERROR400.statusCode).send({
      message: replaceSlashesWithDots(error.message) || ERROR400.message,
    });
  } else {
    reply.send(error);
  }
});

server.register(fastifyEnv, options);
server.register(router, { prefix: "/v1" });
await server.after();
server.register(fp(mongoosePlugin), {
  mongoDBUri: process.env.MONGODB_URI,
});

await server.after();

const start = async () => {
  try {
    await server.listen({ port: Number(process.env.PORT) || 8080 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

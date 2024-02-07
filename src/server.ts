import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import configOptions from "./plugins/config.js";
import logger from "./plugins/logger.js";
import mongoosePlugin from "./plugins/db-connection.js";
import router from "./routes/index.js";
import { ERROR400 } from "./constants/status-codes.js";
import { replaceSlashesWithDots } from "./utils/string-formaters.js";

const server = Fastify({ logger });

//global error handler
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

await server.register(fastifyEnv, configOptions);

server.register(router, { prefix: "/v1" });
server.register(mongoosePlugin, {
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

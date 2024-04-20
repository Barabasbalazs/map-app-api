import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
import configOptions from "./plugins/options/config.js";
import corsOptions from "./plugins/options/cors.js";
import logger from "./plugins/logger.js";
import mongoosePlugin from "./plugins/db-connection.js";
import authPlugin from "./plugins/auth.js";
import router from "./routes/index.js";
import environmentVariables from "./config/env-variables.js";
import { ERROR400 } from "./constants/status-codes.js";
import { formatValidationErrorMessage } from "./utils/string-formaters.js";

async function createServerInstance() {
  const server = Fastify({ logger });

  //global error handler
  server.setErrorHandler((error, _request, reply) => {
    //validation errors overwwrite
    if (error.code === "FST_ERR_VALIDATION") {
      server.log.error(error.message);
      reply.status(error.statusCode || ERROR400.statusCode).send({
        message:
          formatValidationErrorMessage(error.message) || ERROR400.message,
      });
    } else {
      reply.send(error);
    }
  });

  await server.register(fastifyEnv, configOptions);

  await server.register(authPlugin);
  server.register(router, { prefix: "/v1" });

  server.register(fastifyCors, corsOptions);

  const testEnvironment = environmentVariables.getEnvironment() === "test";

  await server.register(mongoosePlugin, {
    mongoDBUri: testEnvironment
      ? environmentVariables.getMongoDBTestUri()
      : environmentVariables.getMongoDBUri(),
    testEnvironment,
  });

  await server.after();

  return server;
}

export default createServerInstance;

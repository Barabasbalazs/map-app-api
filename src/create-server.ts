import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import configOptions from "./plugins/config.js";
import logger from "./plugins/logger.js";
import mongoosePlugin from "./plugins/db-connection.js";
import router from "./routes/index.js";
import environmentVariables from "./config/env-variables.js";
import { ERROR400 } from "./constants/status-codes.js";
import { replaceSlashesWithDots } from "./utils/string-formaters.js";

async function createServerInstance() {
  
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

  const testEnvironment = environmentVariables.getEnvironment() === "test";

  server.register(router, { prefix: "/v1" });

  await server.register(mongoosePlugin, {
    mongoDBUri: testEnvironment ? environmentVariables.getMongoDBTestUri() : environmentVariables.getMongoDBUri(),
    testEnvironment,
  });

  await server.after();

  return server;
}

export default createServerInstance;
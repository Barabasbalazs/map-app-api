import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

async function mongoosePlugin(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  try {
    const connection = await mongoose.connect(options.mongoDBUri);
    if (connection) {
      fastify.log.info("Connected to DB");
    }
    fastify.decorate("db", connection);
  } catch (error) {
    fastify.log.error("Error connecting to DB", error);
    process.exit(1);
  }
}

export default fp(mongoosePlugin);

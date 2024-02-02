import Fastify from "fastify";
import { fastifyEnv, options } from "./plugins/config.js";


const fastify = Fastify({
  logger: {
    serializers: {
        req(request) {
            return {
            method: request.method,
            url: request.url,
            params: request.params,
            };
        },
        res(reply) {
            return {
            statusCode: reply.statusCode,
            };
        },
    }
  },
});

fastify.get("/", async (request, reply) => {
  return { hello: "world1" };
});

fastify.register(fastifyEnv, options);
//this will be called once all the plugins have been loaded
await fastify.after();

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) || 8080 });
  } catch (err) {
    fastify.log.error(err);
  }
};

start();

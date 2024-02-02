import fastifyEnv from "@fastify/env";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 8080,
    },
  },
};

const options = {
  dotenv: true,
  schema: schema,
  data: process.env,
};

export { fastifyEnv, options };

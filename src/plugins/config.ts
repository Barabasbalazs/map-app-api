const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 8080,
    },
    ENVIRONMENT: {
      type: "string",
      default: "dev",
    },
  },
};

const options = {
  dotenv: true,
  schema: schema,
  data: process.env,
  confKey: "config",
};

export default options;

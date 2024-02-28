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
    SALT_ROUNDS: {
      type: "number",
      default: 10,
    },
    SECRET: {
      type: "string",
      default: "secret",
    },
    MONGODB_URI: {
      type: "string",
      default: "",
    },
    MONGODB_TEST_URI: {
      type: "string",
      default: "",
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

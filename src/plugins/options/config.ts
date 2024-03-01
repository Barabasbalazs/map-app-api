const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 8080,
    },
    NODE_ENV: {
      type: "string",
      default: "development",
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

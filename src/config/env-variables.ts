const environmentVariables = {
  getEnvironment: () => {
    return process.env.NODE_ENV || "development";
  },
  getSecret: () => {
    return process.env.SECRET || "123456789";
  },
  getMongoDBUri: () => {
    return process.env.MONGODB_URI || "";
  },
  getMongoDBTestUri: () => {
    return process.env.MONGODB_TEST_URI || "";
  },
  getSaltRounds: () => {
    return parseInt(process.env.SALT_ROUNDS || "10");
  },
  getPort: () => {
    return process.env.PORT || 8080;
  },
  getFrontendUrl: () => {
    return process.env.FRONTEND_URL || "http://localhost:5173";
  }
};

export default environmentVariables;

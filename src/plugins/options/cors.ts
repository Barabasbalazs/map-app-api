import environmentVariables from "../../config/env-variables.js";

const options = {
    origin: environmentVariables.getEnvironment() !== "production" ? "http://localhost:5173" : environmentVariables.getFrontendUrl(),
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
}

export default options;

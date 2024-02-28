import environmentVariables from "../../config/env-variables.js";

const options = {
    origin: environmentVariables.getEnvironment() === "dev" ? "http://localhost:5173" : environmentVariables.getFrontendUrl(),
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
}

export default options;

import createServerInstance from "./create-server.js";
import environmentVariables from "./config/env-variables.js";

const server = await createServerInstance();

const start = async () => {
   try {
     await server.listen({ port: Number(environmentVariables.getPort()) });
   } catch (err) {
     server.log.error(err);
     process.exit(1);
   }
};

start();

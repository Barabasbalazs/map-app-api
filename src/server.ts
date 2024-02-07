import createServerInstance from "./create-server.js";

const server = await createServerInstance();

const start = async () => {
   try {
     await server.listen({ port: Number(process.env.PORT) || 8080 });
   } catch (err) {
     server.log.error(err);
     process.exit(1);
   }
};

start();

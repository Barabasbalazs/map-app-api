import createServerInstance from "../../src/create-server";
import { beforeAll, afterEach, afterAll } from "@jest/globals";

let serverPromise: Promise<any>;

beforeAll(async () => {
  serverPromise = (await createServerInstance()) as any;
});

afterEach(async () => {
  const server = await serverPromise;
  const models = server.db.modelNames();
  for (const model of models) {
    await server.db.model(model).deleteMany({});
  }
});

afterAll(async () => {
  const server = await serverPromise;
  await server.close();
  await server.db.disconnect();
});

async function getServer() {
  return await serverPromise;
}

export default getServer;
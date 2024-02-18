import createServerInstance from "../../src/create-server";
import { beforeAll, afterEach, afterAll } from "@jest/globals";
import userModel, { User } from "../../src/models/user-model";
import { setSchemaTransformer } from "../../src/utils/mongo-schema-setter";

let serverPromise: Promise<any>;

const testUser = {
  email: "test-user@mail.com",
  password: "password1",
};

async function seedDatabase() {
  await userModel.create(testUser);
}

beforeAll(async () => {
  serverPromise = (await createServerInstance()) as any;
  const server = await serverPromise;
  await server.ready();
  await seedDatabase();
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

export { getServer, testUser };

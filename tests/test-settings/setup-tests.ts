import createServerInstance from "../../src/create-server";
import { beforeAll, afterEach, afterAll } from "@jest/globals";
import userModel from "../../src/models/user-model";

let serverPromise: Promise<any>;

const testUser = {
  email: "test-user@mail.com",
  password: "password1",
};

const hashedUser = {
  email: "test-user@mail.com",
  password: "$2a$10$bKrAW5/gUCVThi0z4N96Lu.BihbDvFZesCgXjAW7YfRrWA9IndbgC",
};

async function seedDatabase() {
  const isUserInDb = await userModel.findOne({ email: testUser.email });
  if (!isUserInDb) {
    await userModel.create(hashedUser);
  }
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

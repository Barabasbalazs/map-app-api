import {
  getServer,
  testUser,
  hashedUser,
} from "../../test-settings/setup-tests";
import userModel from "../../../src/models/user-model";
import createServerInstance from "../../../src/create-server";
import {
  expect,
  test,
  describe,
  beforeAll,
  afterAll,
  afterEach,
} from "@jest/globals";

let server: any;

async function seedDatabase() {
  const isUserInDb = await userModel.findOne({ email: testUser.email });
  if (!isUserInDb) {
    await userModel.create(hashedUser);
  }
}

beforeAll(async () => {
  server = (await createServerInstance()) as any;
  await server.ready();
  await seedDatabase();
});

afterEach(async () => {
  if (server.db.readyState) {
    const models = server.db.modelNames();
    for (const model of models) {
      await server.db.model(model).deleteMany({});
    }
  }
});

afterAll(async () => {
  if (server.db.readyState) {
    await server.close();
    await server.db.disconnect();
  }
});

const invalidCredentials = [
  {
    email: "das",
    password: testUser.password,
  },
  {
    email: testUser.email,
    password: "das",
  },
  {
    email: "das",
    password: "das",
  },
];

describe("Testing the login route", () => {
  test("Should return 200 and a validated user upon succesfull login", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: testUser,
    });
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBeDefined();

    const authenticatedResponse = JSON.parse(response.payload);
    const { user, authToken } = authenticatedResponse;

    expect(user.email).toBe(testUser.email);
    expect(authToken).toBeDefined();
    expect(user.role).toBe("USER");
  });
  test("Should return 401 upon sending invalid credentials", async () => {
    //const server = await getServer();
    invalidCredentials.forEach(async (invalidUser) => {
      const response = await server.inject({
        method: "POST",
        url: "/v1/auth/login",
        payload: invalidUser,
      });
      expect(response.statusCode).toBe(401);
    });
  });
});

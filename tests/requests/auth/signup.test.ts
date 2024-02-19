import {
  getServer,
  testUser,
  hashedUser,
} from "../../test-settings/setup-tests";
import createServerInstance from "../../../src/create-server";
import userModel from "../../../src/models/user-model";
import {
  expect,
  test,
  describe,
  beforeAll,
  afterAll,
  afterEach,
} from "@jest/globals";

const invalidUserData = [
  {
    email: "",
    password: "123456",
  },
  {
    email: "8qwhdqwhd",
    password: "123456789",
  },
  {
    email: "123@mail",
    password: "12345689",
  },
  {
    email: "123@mail.com",
    password: "1234567",
  },
  {
    email: "23234@mail.",
    password: "123456789",
  },
  {
    email: "123@mail.com",
    password: "",
  },
];

const validUserData = [
  {
    email: "balazs@mail.com",
    password: "123456789",
  },
  {
    email: "balazs2@mail.com",
    password: "123456789",
  },
];

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

describe("Testing the signup route", () => {
  test("Should return a 400 status code upon sending invalid user data", async () => {
    //const server = await getServer();
    invalidUserData.forEach(async (user) => {
      const response = await server.inject({
        method: "POST",
        url: "/v1/auth/signup",
        payload: user,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  test("Should return an authenticated user upon sending valid user data", async () => {
    //const server = await getServer();
    const response = await server.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: validUserData[0],
    });
    expect(response.statusCode).toBe(201);

    const authenticatedResponse = JSON.parse(response.payload);

    const { user, authToken } = authenticatedResponse;

    expect(user.email).toBe(validUserData[0].email);
    expect(user.role).toBe("USER");
    expect(authToken).toBeDefined();
    expect(user.password).toBeUndefined();
  });
  test("Should return a 403 status code upon sending an already existing email", async () => {
    //const server = await getServer();
    const response = await server.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: validUserData[1],
    });
    expect(response.statusCode).toBe(201);

    const response2 = await server.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: validUserData[1],
    });

    expect(response2.statusCode).toBe(403);
  });
});

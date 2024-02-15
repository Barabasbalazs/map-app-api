import { getServer, testUser } from "../../test-settings/setup-tests";
import { expect, test, describe } from "@jest/globals";

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
    const server = await getServer();
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
    const server = await getServer();
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

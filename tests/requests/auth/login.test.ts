import { expect, test, describe, afterAll, beforeAll } from "vitest";
import { cleanOutDb } from "../../settings/utils";
import { testUser, invalidCredentials } from "../../settings/constants";

const server = global.server;

afterAll(async () => {
  await cleanOutDb(server);
});

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
    expect(user.role).toBe("user");
  });
  test("Should return 401 upon sending invalid credentials", async () => {
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

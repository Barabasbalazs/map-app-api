import {
  expect,
  test,
  describe,
} from "vitest";
import { invalidUserData, validUserData } from "../../settings/constants";

const server = global.server;

describe("Testing the signup route", () => {
  test("Should return a 400 status code upon sending invalid user data", async () => {
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

import getServer from "../../test-settings/setup-tests";
import { expect, test, describe } from "@jest/globals";

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

describe("Testing the signup route", () => {
  test("Should return a 400 status code upon sending invalid user data", async () => {
    const server = await getServer();
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
    const server = await getServer();
    const response = await server.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: validUserData[0],
    });
    expect(response.statusCode).toBe(201);

    const authenticatedUser = JSON.parse(response.payload);

    expect(authenticatedUser.user.email).toBe(validUserData[0].email);
    expect(authenticatedUser.user.role).toBe("USER");
    expect(authenticatedUser.authToken).toBeDefined();
    expect(authenticatedUser.user.password).toBeUndefined();
  });
  test("Should return a 403 status code upon sending an already existing email", async () => {
    const server = await getServer();
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

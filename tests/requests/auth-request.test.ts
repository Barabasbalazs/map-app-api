import createServerInstance from "../../src/create-server";
import { expect, test, describe } from "@jest/globals";

describe("Testing the login route", () => {
    test("Should return a 200 status code", async () => {

        const server = await createServerInstance() as any;

        const response = await server.inject({
            method: "POST",
            url: "/v1/auth/login",
        });
        expect(response.statusCode).toBe(200);

        await server.close();
        await server.db.disconnect();
    });
})
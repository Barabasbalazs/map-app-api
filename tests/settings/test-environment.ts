import type { Environment } from "vitest";
import { cleanOutDb } from "./utils.js";
import { testUser, hashedUser } from "./constants.js";
import createServerInstance from "../../src/create-server.js";
import userModel from "../../src/models/user-model.js";

async function seedDatabase() {
  const isUserInDb = await userModel.findOne({ email: testUser.email });
  if (!isUserInDb) {
    try {
      await userModel.create(hashedUser);
    } catch (error) {
      await cleanOutDb(global.server);
    }
  }
}

export default <Environment>{
  name: "custom-test-environment",
  transformMode: "web",
  async setup() {
    const server = (await createServerInstance());
    await server.ready();

    await seedDatabase();

    global.server = server;

    return {
      async teardown() {
        const globalServer = global.server;
        if (globalServer.db.readyState) {
          await cleanOutDb(globalServer);

          await globalServer.close();
          await globalServer.db.disconnect();
        }
      },
    };
  },
};

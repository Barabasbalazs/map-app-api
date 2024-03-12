import type { Environment } from "vitest";
import { cleanOutDb } from "./utils.js";
import { adminUser, hashedAdminUser, normalUser, hashedUser } from "./constants.js";
import createServerInstance from "../../src/create-server.js";
import userModel from "../../src/models/user-model.js";

async function seedDatabase() {
  const isUserInDb = await userModel.findOne({ email: normalUser.email });
  const isAdminInDb = await userModel.findOne({ email: adminUser.email });
  if (!isUserInDb && !isAdminInDb) {
    try {
      await userModel.create(hashedUser);
      await userModel.create(hashedAdminUser);
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

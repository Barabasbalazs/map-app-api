export async function cleanOutDb(server: any) {
  if (server?.db?.readyState) {
    const models = server.db.modelNames();
    for (const model of models) {
      await server.db.model(model).deleteMany({});
    }
  }
}

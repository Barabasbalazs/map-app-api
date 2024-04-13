import { S } from "fluent-json-schema";

const administrationSchema = {
  userIdSchema: {
    queryString: S.object(),
    params: S.object().prop("id", S.string().required()),
    headers: S.object(),
  },
  partialUserSchema: {
    body: S.object()
      .additionalProperties(false)
      .prop("email", S.string().format(S.FORMATS.EMAIL))
      .prop("name", S.string())
      .without(["password", "role", "id", "_id"]),
    queryString: S.object(),
    params: S.object(),
    headers: S.object(),
  },
};

export default administrationSchema;

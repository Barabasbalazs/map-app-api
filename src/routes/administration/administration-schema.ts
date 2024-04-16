import { S } from "fluent-json-schema";
import ROLES from "../../constants/roles.js";

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
      .prop("role", S.string().enum(Object.values(ROLES)))
      .without(["password", "id", "_id"]),
    queryString: S.object(),
    params: S.object().prop("id", S.string().required()),
    headers: S.object(),
  },
};

export default administrationSchema;

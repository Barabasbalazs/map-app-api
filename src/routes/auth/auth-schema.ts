import { S } from "fluent-json-schema";

const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const authSchema = {
  signupSchema: {
    body: S.object()
      .prop("email", S.string().format(S.FORMATS.EMAIL).required())
      .prop("password", S.string().minLength(8).required())
      .prop("firstName", S.string())
      .prop("lastName", S.string())
      .prop("role", S.string().enum(Object.values(ROLES)).default(ROLES.USER)),
    queryString: S.object(),
    params: S.object(),
    headers: S.object(),
  },
};

export default authSchema;

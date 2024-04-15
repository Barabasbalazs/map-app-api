import { S } from "fluent-json-schema";
import ROLES from "../../constants/roles.js";

const authSchema = {
  signupSchema: {
    body: S.object()
      .prop("email", S.string().format(S.FORMATS.EMAIL).required())
      .prop("password", S.string().minLength(8).required())
      .prop("name", S.string())
      .prop("role", S.string().enum(Object.values(ROLES)).default(ROLES.USER)),
    queryString: S.object(),
    params: S.object(),
    headers: S.object(),
  },
  loginSchema: {
    body: S.object()
      .prop("email", S.string().format(S.FORMATS.EMAIL).required())
      .prop("password", S.string().minLength(8).required()),
    queryString: S.object(),
    params: S.object(),
    headers: S.object(),
  },
};

export default authSchema;

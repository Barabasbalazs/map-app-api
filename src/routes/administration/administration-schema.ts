import { S } from "fluent-json-schema";

const administrationSchema = {
  userIdSchema: {
    queryString: S.object(),
    params: S.object().prop("id", S.string().required()),
    headers: S.object(),
  },
};

export default administrationSchema;

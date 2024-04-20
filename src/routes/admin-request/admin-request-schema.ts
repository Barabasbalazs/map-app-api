import { S } from "fluent-json-schema";

const adminRequestSchema = {
  adminRequestResponseSchema: {
    body: S.object()
      .additionalProperties(false)
      .prop("accepted", S.boolean().required()),
    queryString: S.object(),
    params: S.object().prop("id", S.string().required()),
    headers: S.object(),
  },
};

export default adminRequestSchema;

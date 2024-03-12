import { S } from "fluent-json-schema";

const coordinatesSchema = S.object()
  .prop("lat", S.number().required().minimum(-90).maximum(90))
  .prop("lng", S.number().required().minimum(-180).maximum(180));

const trailSchema = {
  createTrailSchema: {
    body: S.object()
      .prop("name", S.string().required().minLength(1))
      .prop("location", S.string())
      .prop(
        "path",
        S.array()
          .items(
            S.object()
              .prop("name", S.string().required())
              .prop("coordinates", coordinatesSchema)
              .required()
          )
          .required()
      )
      .prop("users", S.array().items(S.string())),
    queryString: S.object(),
    params: S.object(),
    headers: S.object(),
  },
  queryTrailsSchema: {
    queryString: S.object()
      .prop(
        "sort",
        S.string().enum(["name", "location", "createdAt", "creator"])
      )
      .prop("order", S.string().enum(["asc", "desc"]))
      .prop("search", S.string())
      .prop("creator", S.string()),
    params: S.object(),
    headers: S.object(),
  },
  updateTrailSchema: {
    body: S.object()
      .prop("name", S.string().minLength(1))
      .prop("location", S.string())
      .prop(
        "path",
        S.array().items(
          S.object()
            .prop("name", S.string().required())
            .prop("coordinates", coordinatesSchema)
            .required()
        )
      ),
    queryString: S.object(),
    params: S.object().prop("id", S.string().required()),
    headers: S.object(),
  },
};

export default trailSchema;

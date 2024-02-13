import { Schema } from "mongoose";

export function setSchemaTransformer(schema: Schema) {
  schema.set("toJSON", {
    transform: function (_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      if (ret.password) {
        delete ret.password;
      }
    },
  });
  return schema;
}

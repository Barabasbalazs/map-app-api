export function baseTransformer(_doc: any, ret: any, _options: any) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

export function userSchemaTransformer(_doc: any, ret: any, _options: any) {
  delete ret.password;
  delete ret.trails;
  baseTransformer(_doc, ret, _options);
}

export function trailSchemaTransformer(doc: any, ret: any, _options: any) {
  delete ret.users;
  baseTransformer(doc, ret, _options);
}

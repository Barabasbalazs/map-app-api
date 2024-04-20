export function baseTransformer(_doc: any, ret: any, _options: any) {
  ret.id = ret._id;
  delete ret.__v;
}

export function userSchemaTransformer(_doc: any, ret: any, _options: any) {
  delete ret.password;
  baseTransformer(_doc, ret, _options);
}

export function trailSchemaTransformer(doc: any, ret: any, _options: any) {
  delete ret.users;
  delete ret.creator.password;
  delete ret.creator.trails;
  ret.creator.id = ret.creator._id;
  baseTransformer(doc, ret, _options);
}

export function adminRequestSchemaTransformer(
  doc: any,
  ret: any,
  _options: any
) {
  ret.user.id = ret.user._id;
  delete ret.user.trails;
  baseTransformer(doc, ret, _options);
}

import { Trail } from "../models/trail-model.js";
import { OrderType } from "./order-type.js";

export type TrailQuery = {
  sort?: keyof Trail;
  order?: OrderType;
  search?: string;
  creator?: string;
};

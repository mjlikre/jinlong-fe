import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["inventory"];
export const baseSelector = R.pathOr({}, basePath);

export const inventoriesSelector = createSelector(
  baseSelector,
  R.prop("inventories")
);

import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["sales"];

export const baseSelector = R.pathOr({}, basePath);

export const salesSelector = createSelector(
  baseSelector,
  R.propOr([], "sales")
);

export const updateSalesSelector = createSelector(
  baseSelector,
  R.propOr(false, "update")
);

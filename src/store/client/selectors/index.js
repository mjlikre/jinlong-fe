import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["clients"];

export const baseSelector = R.pathOr({}, basePath);

export const clientsSelector = createSelector(
  baseSelector,
  R.propOr([], "clients")
);

export const updateClientSelector = createSelector(
  baseSelector,
  R.propOr(false, "update")
);

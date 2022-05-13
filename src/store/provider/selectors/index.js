import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["providers"];

export const baseSelector = R.pathOr({}, basePath);

export const providersSelector = createSelector(
  baseSelector,
  R.propOr([], "providers")
);

export const providerSelector = createSelector(
  baseSelector,
  R.propOr(false, "provider")
);

export const updateProviderSelector = createSelector(
  baseSelector,
  R.propOr(false, "update")
);

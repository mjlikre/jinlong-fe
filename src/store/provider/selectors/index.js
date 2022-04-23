import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["providers"];

export const baseSelector = R.pathOr({}, basePath);

export const providersSelector = createSelector(
  baseSelector,
  R.prop("providers")
);

export const updateProviderSelector = createSelector(
  baseSelector,
  R.prop("update")
);

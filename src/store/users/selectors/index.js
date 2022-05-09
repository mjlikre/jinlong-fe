import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["users"];
export const baseSelector = R.pathOr({}, basePath);

export const userSelector = createSelector(baseSelector, R.prop("user"));

export const userDisplayLanguageSelector = createSelector(
  baseSelector,
  R.prop("lang")
);

import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["user"];
export const baseSelector = R.pathOr({}, basePath);

export const userSelector = createSelector(baseSelector, R.prop("user"));

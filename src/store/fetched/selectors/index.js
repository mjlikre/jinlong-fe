import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["fetched"];
export const baseSelector = R.pathOr({}, basePath);

export const fetchedSelector = createSelector(baseSelector, R.prop("fetched"));

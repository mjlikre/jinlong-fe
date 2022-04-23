import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["purchase"];

export const baseSelector = R.pathOr({}, basePath);

export const purchasesSelector = createSelector(
  baseSelector,
  R.prop("purchases")
);

export const updatePurchaseSelector = createSelector(
  baseSelector,
  R.prop("update")
);

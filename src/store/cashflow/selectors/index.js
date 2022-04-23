import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["cashflow"];

export const baseSelector = R.pathOr({}, basePath);

export const cashflowSelector = createSelector(
  baseSelector,
  R.prop("cashflows")
);

export const updateCashflowSelector = createSelector(
  baseSelector,
  R.prop("update")
);

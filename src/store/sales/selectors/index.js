import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";
import { purchaseEdit } from "../../purchases/selectors";

const basePath = ["sales"];

export const baseSelector = R.pathOr({}, basePath);

export const salesSelector = createSelector(
  baseSelector,
  R.propOr([], "sales")
);

export const updateSaleItemSelector = createSelector(
  baseSelector,
  R.propOr(false, "update")
);

export const saleEditSelector = createSelector(
  baseSelector,
  R.propOr({}, "edit")
);

export const currentSaleClientIdSelector = createSelector(
  purchaseEdit,
  R.propOr(null, "clientId")
);

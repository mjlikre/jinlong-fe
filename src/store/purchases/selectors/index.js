import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["purchase"];

export const baseSelector = R.pathOr({}, basePath);

export const purchasesSelector = createSelector(
  baseSelector,
  R.propOr([], "purchases")
);

export const purchaseIdSelector = createSelector(
  baseSelector,
  R.propOr("", "purchase")
);

export const purchaseSelector = createSelector(
  purchasesSelector,
  purchaseIdSelector,
  (purchases, purchaseId) => R.find(R.propEq("id", purchaseId), purchases)
);

export const purchaseEdit = createSelector(
  baseSelector,
  R.propOr(false, "edit")
);

export const purchaseItemUpdateSelector = createSelector(
  baseSelector,
  R.propOr(false, "update")
);

export const currentPurchaseProviderIdSelector = createSelector(
  purchaseEdit,
  R.propOr(null, "providerId")
);

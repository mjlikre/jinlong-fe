import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["inventory"];
export const baseSelector = R.pathOr({}, basePath);

export const inventoriesSelector = createSelector(
  baseSelector,
  R.propOr([], "inventories")
);

export const inventoryUpdateSelector = createSelector(
  baseSelector,
  R.propOr(false, "update")
);

export const inventoriesToUpdateSelector = createSelector(
  baseSelector,
  R.propOr([], "inventoriesToUpdate")
);

export const inventoriesAddedSelector = createSelector(
  baseSelector,
  R.propOr([], "inventoriesAdded")
);

import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

const basePath = ["providers"];

export const baseSelector = R.pathOr({}, basePath);

export const providersSelector = createSelector(
  baseSelector,
  R.propOr([], "providers")
);

export const providerIdSelector = createSelector(
  baseSelector,
  R.propOr("", "provider")
);

export const providerSelector = createSelector(
  providersSelector,
  providerIdSelector,
  (providers, providerId) => {
    return R.find(R.propEq("id", providerId), providers);
  }
);

export const updateProviderSelector = createSelector(
  baseSelector,
  R.propOr(false, "update")
);

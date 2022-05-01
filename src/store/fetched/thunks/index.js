import * as R from "ramda";

import fetchedSlice from "../slice";
import * as cashflowSlice from "../../cashflow";
import * as clientSlice from "../../client";
import * as inventorySlice from "../../inventory";
import * as providersSlice from "../../provider";
import * as purchasesSlice from "../../purchases";
import * as salesSlice from "../../sales";

export const fetch = () => async (dispatch, getState) => {
  try {
    await dispatch(inventorySlice.thunks.getInventories());
    await dispatch(salesSlice.thunks.getSales());
    await dispatch(providersSlice.thunks.getProviders());
    await dispatch(purchasesSlice.thunks.getPurchases());
    await dispatch(clientSlice.thunks.getClients());
    await dispatch(cashflowSlice.thunks.getCashflows());

    const { cashflow, clients, inventory, providers, purchase, sales } =
      getState();
    const fetched =
      R.hasPath(["cashflows"], cashflow) &&
      R.hasPath(["inventories"], inventory) &&
      R.hasPath(["clients"], clients) &&
      R.hasPath(["providers"], providers) &&
      R.hasPath(["purchases"], purchase) &&
      R.hasPath(["sales"], sales);
    fetched && dispatch(fetchedSlice.actions.setFetched({ fetched: true }));
  } catch (e) {
    dispatch(fetchedSlice.actions.setFetched({ fetched: false }));
    throw e;
  }
};

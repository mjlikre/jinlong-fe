import fetchedSlice from "../slice";
import * as cashflowSlice from "../../cashflow";
import * as clientSlice from "../../client";
import * as inventorySlice from "../../inventory";
import * as providersSlice from "../../provider";
import * as purchasesSlice from "../../purchases";
import * as salesSlice from "../../sales";

export const fetched = () => async (dispatch) => {
  try {
    dispatch(inventorySlice.thunks.getInventories());
    dispatch(salesSlice.thunks.getSales());
    dispatch(providersSlice.thunks.getProviders());
    dispatch(purchasesSlice.thunks.getPurchases());
    dispatch(clientSlice.thunks.getClients());
    dispatch(cashflowSlice.thunks.getCashflows());
    dispatch(fetchedSlice.actions.setFetched({ fetched: true }));
  } catch (e) {
    dispatch(fetchedSlice.actions.setFetched({ fetched: false }));
    throw e;
  }
};

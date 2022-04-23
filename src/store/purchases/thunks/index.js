import { makeRequest } from "../../../lib/makeRequest";
import purchasesSlice from "../slice";

export const getPurchases =
  ({ callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`purchases`, "get");
      dispatch(purchasesSlice.actions.setPurchases({ purchases: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const getPurchase =
  ({ purchaseId, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`purchases/${purchaseId}`, "get");
      dispatch(purchasesSlice.actions.setPurchase({ purchase: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const deletePurchase =
  ({ purchaseId, index, callback }) =>
  async (dispatch) => {
    try {
      await makeRequest(`purchases/${purchaseId}`, "delete");
      dispatch(purchasesSlice.actions.deletePurchase({ index }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const updatePurchase =
  ({ purchaseId, update, index, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`purchases/${purchaseId}`, "patch", update);
      dispatch(
        purchasesSlice.actions.updatePurchase({ purchase: res.date, index })
      );
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const createPurchase =
  ({ purchase, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`purchases`, "post", purchase);
      dispatch(purchasesSlice.actions.createpurchases({ purchase: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

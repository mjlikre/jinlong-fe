import { makeRequest } from "../../../lib/makeRequest";
import purchasesSlice from "../slice";

export const getPurchases = () => async (dispatch) => {
  try {
    const res = await makeRequest(`purchases`, "get", null, dispatch);
    dispatch(purchasesSlice.actions.setPurchases({ purchases: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getPurchase =
  ({ purchaseId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `purchases/${purchaseId}`,
        "get",
        null,
        dispatch
      );
      dispatch(purchasesSlice.actions.setPurchase({ purchase: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const deletePurchase =
  ({ purchaseId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`purchases/${purchaseId}`, "delete", null, dispatch);
      dispatch(purchasesSlice.actions.deletePurchase({ index }));
    } catch (e) {
      throw e;
    }
  };

export const updatePurchase =
  ({ purchaseId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `purchases/${purchaseId}`,
        "patch",
        update,
        dispatch
      );
      dispatch(
        purchasesSlice.actions.updatePurchase({ purchase: res.date, index })
      );
    } catch (e) {
      throw e;
    }
  };

export const createPurchase =
  ({ purchase }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`purchases`, "post", purchase, dispatch);
      dispatch(purchasesSlice.actions.createpurchases({ purchase: res.data }));
    } catch (e) {
      throw e;
    }
  };

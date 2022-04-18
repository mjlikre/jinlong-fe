import axios from "axios";
import purchasesSlice from "../slice";

export const getPurchases =
  ({ callback }) =>
  async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/purchases", {
        headers: { authorization: localStorage.getItem("token") },
      });
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
      const res = await axios.get(
        `http://localhost:3001/purchases/${purchaseId}`,
        { headers: { authorization: localStorage.getItem("token") } }
      );
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
      await axios.delete(`http://localhost:3001/purchases/${purchaseId}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
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
      const res = await axios.patch(
        `http://localhost:3001/purchases/${purchaseId}`,
        update,
        { headers: { authorization: localStorage.getItem("token") } }
      );
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
      const res = await axios.post(
        `http://localhost:3001/purchases`,
        purchase,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      dispatch(purchasesSlice.actions.createpurchases({ purchase: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

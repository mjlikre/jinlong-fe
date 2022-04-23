import salesSlice from "../slice";
import { makeRequest } from "../../../lib/makeRequest";

export const getSales =
  ({ callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest("sales", "get");
      dispatch(salesSlice.actions.setSales({ sales: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const getSale =
  ({ salesId, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`sales/${salesId}`, "get");
      dispatch(salesSlice.actions.setSale({ sale: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const deleteSale =
  ({ salesId, index, callback }) =>
  async (dispatch) => {
    try {
      await makeRequest(`sales/${salesId}`, "delete");
      dispatch(salesSlice.actions.deleteSale({ index }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const updateSale =
  ({ salesId, update, index, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`sales/${salesId}`, "patch", update);
      dispatch(salesSlice.actions.updateSale({ sale: res.date, index }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const createSale =
  ({ sales, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`sales`, "post", sales);
      dispatch(salesSlice.actions.createSale({ sale: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

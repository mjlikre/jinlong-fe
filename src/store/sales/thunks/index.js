import salesSlice from "../slice";
import { makeRequest } from "../../../lib/makeRequest";

export const getSales = () => async (dispatch) => {
  try {
    const res = await makeRequest("sales", "get", null, dispatch);
    dispatch(salesSlice.actions.setSales({ sales: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getSale =
  ({ salesId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`sales/${salesId}`, "get", null, dispatch);
      dispatch(salesSlice.actions.setSale({ sale: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const deleteSale =
  ({ salesId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`sales/${salesId}`, "delete", null, dispatch);
      dispatch(salesSlice.actions.deleteSale({ index }));
    } catch (e) {
      throw e;
    }
  };

export const updateSale =
  ({ salesId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `sales/${salesId}`,
        "patch",
        update,
        dispatch
      );
      dispatch(salesSlice.actions.updateSale({ sale: res.date, index }));
    } catch (e) {
      throw e;
    }
  };

export const createSale =
  ({ sales }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`sales`, "post", sales, dispatch);
      dispatch(salesSlice.actions.createSale({ sale: res.data }));
    } catch (e) {
      throw e;
    }
  };

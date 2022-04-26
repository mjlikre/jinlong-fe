import { makeRequest } from "../../../lib/makeRequest";
import cashflowSlice from "../slice";

export const getCashflows = () => async (dispatch) => {
  try {
    const res = await makeRequest(`cashflow`, "get", null, dispatch);
    dispatch(cashflowSlice.actions.setCashflows({ cashflows: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getCashflow =
  ({ cashflowId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `cashflow/${cashflowId}`,
        "get",
        null,
        dispatch
      );
      dispatch(cashflowSlice.actions.setCashflow({ cashflow: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const deleteCashflow =
  ({ cashflowId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`cashflow/${cashflowId}`, "delete", null, dispatch);
      dispatch(cashflowSlice.actions.deleteCashflow({ index }));
    } catch (e) {
      throw e;
    }
  };

export const updateCashflow =
  ({ cashflowId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `cashflow/${cashflowId}`,
        "patch",
        update,
        dispatch
      );
      dispatch(
        cashflowSlice.actions.updateCashflow({ cashflow: res.date, index })
      );
    } catch (e) {
      throw e;
    }
  };

export const createCashflow =
  ({ cashflow }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`cashflow`, "post", cashflow, dispatch);
      dispatch(cashflowSlice.actions.createCashflow({ cashflow: res.data }));
    } catch (e) {
      throw e;
    }
  };

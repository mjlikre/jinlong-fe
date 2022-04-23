import { makeRequest } from "../../../lib/makeRequest";
import cashflowSlice from "../slice";

export const getCashflows =
  ({ callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`cashflow`, "get");
      dispatch(cashflowSlice.actions.setCashflows({ cashflows: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const getCashflow =
  ({ cashflowId, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`cashflow/${cashflowId}`, "get");
      dispatch(cashflowSlice.actions.setCashflow({ cashflow: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const deleteCashflow =
  ({ cashflowId, index, callback }) =>
  async (dispatch) => {
    try {
      await makeRequest(`cashflow/${cashflowId}`, "delete");
      dispatch(cashflowSlice.actions.deleteCashflow({ index }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const updateCashflow =
  ({ cashflowId, update, index, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`cashflow/${cashflowId}`, "patch", update);
      dispatch(
        cashflowSlice.actions.updateCashflow({ cashflow: res.date, index })
      );
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const createCashflow =
  ({ cashflow, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`cashflow`, "post", cashflow);
      dispatch(cashflowSlice.actions.createCashflow({ cashflow: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

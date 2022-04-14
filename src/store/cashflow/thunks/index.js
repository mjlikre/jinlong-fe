import axios from "axios";
import cashflowSlice from '../slice'

export const getCashflows = ({ callback }) => (dispatch, getState) => {
  try {
    const res = await axios.get(
        "http://localhost:3001/cashflow", 
        { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(cashflowSlice.actions.setCashflows({cashflows: res.data}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const getCashflow = ({ cashflowId, callback }) => (dispatch, getState) => {
    try {
      const res = await axios.get(
          `http://localhost:3001/cashflow/${cashflowId}`, 
          { headers: { authorization: localStorage.getItem("token") } },
      );
      dispatch(cashflowSlice.actions.setCashflow({cashflow: res.data}))
      callback();
    } catch (e) {
      callback(e);
    }
};
  
export const deleteCashflow = ({ cashflowId, index, callback }) => (dispatch, getState) => {
  try {
    await axios.delete(
        `http://localhost:3001/cashflow/${cashflowId}`, 
        { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(cashflowSlice.actions.deleteCashflow({index}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const updateCashflow = ({ cashflowId, update, index, callback }) => (dispatch, getState) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/cashflow/${cashflowId}`,
      update,
      { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(cashflowSlice.actions.updateCashflow({cashflow: res.date, index}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const createCashflow = ({ cashflow, callback }) => (dispatch, getState) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/cashflow`,
      cashflow,
      { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(cashflowSlice.actions.createCashflow({cashflow: res.data}))
    callback();
  } catch (e) {
    callback(e);
  }
};
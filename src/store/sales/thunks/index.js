import axios from "axios";
import salesSlice from '../slice'

export const getSales = ({ callback }) => (dispatch, getState) => {
  try {
    const res = await axios.get(
        "http://localhost:3001/sales", 
        { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(salesSlice.actions.setSales({sales: res.data}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const getSale = ({ salesId, callback }) => (dispatch, getState) => {
    try {
      const res = await axios.get(
          `http://localhost:3001/sales/${salesId}`, 
          { headers: { authorization: localStorage.getItem("token") } },
      );
      dispatch(salesSlice.actions.setSale({sale: res.data}))
      callback();
    } catch (e) {
      callback(e);
    }
};
  
export const deleteSale = ({ salesId, index, callback }) => (dispatch, getState) => {
  try {
    await axios.delete(
        `http://localhost:3001/sales/${salesId}`, 
        { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(salesSlice.actions.deleteSale({index}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const updateSale = ({ salesId, update, index, callback }) => (dispatch, getState) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/sales/${salesId}`,
      update,
      { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(salesSlice.actions.updateSale({sale: res.date, index}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const createSale = ({ sales, callback }) => (dispatch, getState) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/sales`,
      sales,
      { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(salesSlice.actions.createSale({sale: res.data}))
    callback();
  } catch (e) {
    callback(e);
  }
};
import axios from "axios";
import inventorySlice from '../slice'

export const getInventories = ({ callback }) => (dispatch, getState) => {
  try {
    const res = await axios.get(
        "http://localhost:3001/inventory", 
        { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(inventorySlice.actions.setInventories({inventories: res.data}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const getInventory = ({ inventoryId, callback }) => (dispatch, getState) => {
    try {
      const res = await axios.get(
          `http://localhost:3001/inventory/${inventoryId}`, 
          { headers: { authorization: localStorage.getItem("token") } },
      );
      dispatch(inventorySlice.actions.setInventory({inventory: res.data}))
      callback();
    } catch (e) {
      callback(e);
    }
};
  
export const deleteInventory = ({ inventoryId, index, callback }) => (dispatch, getState) => {
  try {
    await axios.delete(
        `http://localhost:3001/inventory/${inventoryId}`, 
        { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(inventorySlice.actions.deleteInventory({index}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const updateInventory = ({ inventoryId, update, index, callback }) => (dispatch, getState) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/inventory/${inventoryId}`,
      update,
      { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(inventorySlice.actions.updateInventory({inventory: res.date, index}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const createInventory = ({ inventory, callback }) => (dispatch, getState) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/inventory`,
      inventory,
      { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(inventorySlice.actions.createInventory({inventory: res.data}))
    callback();
  } catch (e) {
    callback(e);
  }
};
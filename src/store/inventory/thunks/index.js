import inventorySlice from "../slice";
import { makeRequest } from "../../../lib/makeRequest";

export const getInventories = () => async (dispatch) => {
  try {
    const res = await makeRequest(`inventory`, "get");
    dispatch(inventorySlice.actions.setInventories({ inventories: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getInventory =
  ({ inventoryId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`inventory/${inventoryId}`, "get");
      dispatch(inventorySlice.actions.setInventory({ inventory: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const deleteInventory =
  ({ inventoryId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`inventory/${inventoryId}`, "delete");
      dispatch(inventorySlice.actions.deleteInventory({ index }));
    } catch (e) {
      throw e;
    }
  };

export const updateInventory =
  ({ inventoryId, update, index }, callback) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `inventory/${inventoryId}`,
        "patch",
        update
      );
      dispatch(
        inventorySlice.actions.updateInventory({ inventory: res.data, index })
      );
      callback();
    } catch (e) {
      callback(e);
      throw e;
    }
  };

export const createInventory = (inventory, callback) => async (dispatch) => {
  try {
    const res = await makeRequest(`inventory`, "post", inventory);
    dispatch(inventorySlice.actions.createInventory({ inventory: res.data }));
    callback();
  } catch (e) {
    callback(e);
    throw e;
  }
};

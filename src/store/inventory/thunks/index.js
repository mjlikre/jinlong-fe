import inventorySlice from "../slice";
import * as R from "ramda";
import { makeRequest } from "../../../lib/makeRequest";

export const getInventories = () => async (dispatch) => {
  try {
    const res = await makeRequest(`inventory`, "get", null, dispatch);
    dispatch(inventorySlice.actions.setInventories({ inventories: res.data }));
  } catch (e) {
    console.log(e.response.status, "error");
    throw e;
  }
};

export const getInventory =
  ({ inventoryId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `inventory/${inventoryId}`,
        "get",
        null,
        dispatch
      );
      dispatch(inventorySlice.actions.setInventory({ inventory: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const deleteInventory =
  ({ inventoryId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`inventory/${inventoryId}`, "delete", null, dispatch);
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
        update,
        dispatch
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

export const inventoriesToUpdate =
  (inventory, callback) => async (dispatch, getState) => {
    const { inventory: inventoryState } = getState();
    const inventoriesToUpdate = R.pathOr(
      [],
      ["inventoriesToUpdate"],
      inventoryState
    );
    let itemIndex = R.findIndex(R.propEq("inventoryId", inventory.inventoryId))(
      inventoriesToUpdate
    );

    if (itemIndex >= 0) {
      let update = {
        ...inventory,
        update: {
          ...inventory.update,
          quantity:
            inventory.update.quantity +
            inventoriesToUpdate[itemIndex].update.quantity,
        },
      };
      dispatch(
        inventorySlice.actions.updateAddedInventory({
          inventory: update,
          itemIndex,
        })
      );
      return callback();
    }
    dispatch(inventorySlice.actions.inventoriesToUpdate({ inventory }));
    callback();
  };

export const updateAddedInventory =
  (inventory, itemIndex, callback) => async (dispatch) => {
    dispatch(
      inventorySlice.actions.updateAddedInventory({ inventory, itemIndex })
    );
    callback();
  };

export const createInventory = (inventory, callback) => async (dispatch) => {
  try {
    const res = await makeRequest(`inventory`, "post", inventory, dispatch);
    dispatch(inventorySlice.actions.createInventory({ inventory: res.data }));
    callback();
  } catch (e) {
    callback(e);
    throw e;
  }
};

import inventorySlice from "../slice";
import { makeRequest } from "../../../lib/makeRequest";
import * as purchaseSlice from "../../purchases";

export const getInventories = () => async (dispatch) => {
  try {
    const res = await makeRequest(`inventory`, "get", null, dispatch);
    dispatch(inventorySlice.actions.setInventories({ inventories: res.data }));
  } catch (e) {
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
        "put",
        update,
        dispatch
      );
      dispatch(
        inventorySlice.actions.updateInventory({ inventory: res.data, index })
      );
      callback && callback();
    } catch (e) {
      callback && callback(e);
      throw e;
    }
  };

export const createInventory =
  (inventory, fromPurchase, callback) => async (dispatch, getState) => {
    const {
      inventory: { inventories },
    } = getState();
    try {
      const res = await makeRequest(`inventory`, "post", inventory, dispatch);
      dispatch(inventorySlice.actions.createInventory({ inventory: res.data }));
      if (fromPurchase) {
        const {
          id: inventoryId,
          quantity,
          priceBought,
          priceToSell,
          productName,
        } = res.data;
        const item = {
          update: {
            quantity,
            priceBought,
            priceToSell,
            productName,
            prevQuantity: 0,
          },
          inventoryId,
          index: inventories.length,
        };
        dispatch(
          purchaseSlice.actions.newItemAdded({
            item: { inventoryId: res.data.id, index: inventories.length },
          })
        );
        dispatch(
          purchaseSlice.actions.inventoriesToUpdate({ inventory: item })
        );
      }
      callback();
    } catch (e) {
      callback(e);
      throw e;
    }
  };

import * as R from "ramda";

import { makeRequest } from "../../../lib/makeRequest";
import purchasesSlice from "../slice";

export const getPurchases = () => async (dispatch) => {
  try {
    const res = await makeRequest(`purchases`, "get", null, dispatch);
    dispatch(purchasesSlice.actions.setPurchases({ purchases: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getPurchase =
  ({ purchaseId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `purchases/${purchaseId}`,
        "get",
        null,
        dispatch
      );
      dispatch(purchasesSlice.actions.setPurchase({ purchase: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const deletePurchase =
  ({ purchaseId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`purchases/${purchaseId}`, "delete", null, dispatch);
      dispatch(purchasesSlice.actions.deletePurchase({ index }));
    } catch (e) {
      throw e;
    }
  };

export const updatePurchase =
  ({ purchaseId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `purchases/${purchaseId}`,
        "patch",
        update,
        dispatch
      );
      dispatch(
        purchasesSlice.actions.updatePurchase({ purchase: res.date, index })
      );
    } catch (e) {
      throw e;
    }
  };

export const createPurchase =
  ({ purchase }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`purchases`, "post", purchase, dispatch);
      dispatch(purchasesSlice.actions.createpurchases({ purchase: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const setPurchase = (purchaseId) => async (dispatch, getState) => {
  const {
    purchase: { purchases },
  } = getState();
  const purchase = R.find(R.propEq("id", purchaseId))(purchases);
  purchase && dispatch(purchasesSlice.actions.setPurchase({ purchase }));
};

export const inventoriesToUpdate =
  (inventory, callback) => async (dispatch, getState) => {
    const {
      purchase: {
        edit: { itemsPurchased },
      },
    } = getState();
    const inventoriesToUpdate = itemsPurchased;
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

      const amount = inventory.update.quantity * inventory.update.priceBought;

      dispatch(
        purchasesSlice.actions.updateAddedInventory({
          inventory: update,
          itemIndex,
        })
      );
      dispatch(purchasesSlice.actions.updatePurchaseEditAmount({ amount }));
      return callback();
    }

    const amount = inventory.update.quantity * inventory.update.priceBought;
    dispatch(purchasesSlice.actions.inventoriesToUpdate({ inventory }));
    dispatch(purchasesSlice.actions.updatePurchaseEditAmount({ amount }));
    callback();
  };

export const updateAddedInventory =
  (inventory, itemIndex, callback) => async (dispatch, getState) => {
    const {
      purchase: {
        edit: { itemsPurchased },
      },
    } = getState();
    const prev = itemsPurchased[itemIndex];
    const currentAmount =
      inventory.update.quantity * inventory.update.priceBought;
    const prevAmount = prev.update.quantity * prev.update.priceBought;
    const amount = -prevAmount + currentAmount;
    dispatch(
      purchasesSlice.actions.updateAddedInventory({ inventory, itemIndex })
    );
    dispatch(purchasesSlice.actions.updatePurchaseEditAmount({ amount }));

    callback();
  };

export const deleteItemFromList =
  ({ update, itemIndex }) =>
  async (dispatch) => {
    const { quantity, priceBought } = update;
    const amount =
      Math.round((quantity * priceBought + Number.EPSILON) * 100) / 100;
    dispatch(purchasesSlice.actions.deleteItemFromList({ index: itemIndex }));
    dispatch(
      purchasesSlice.actions.updatePurchaseEditAmount({ amount: -amount })
    );
  };

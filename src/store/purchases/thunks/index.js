import * as R from "ramda";

import { makeRequest } from "../../../lib/makeRequest";
import purchasesSlice from "../slice";
import * as inventorySlice from "../../inventory";

export const getPurchases = () => async (dispatch) => {
  try {
    const { data } = await makeRequest(`purchases`, "get", null, dispatch);
    const purchases = data.map((item) => ({
      ...item,
      itemsPurchased: JSON.parse(item.itemsPurchased),
    }));

    dispatch(purchasesSlice.actions.setPurchases({ purchases }));
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

export const updatePurchase =
  ({ purchaseId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `purchases/${purchaseId}`,
        "put",
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

export const setPurchase = (index, callback) => async (dispatch, getState) => {
  const state = getState();
  const {
    purchase: { purchases },
  } = state;
  try {
    const purchase = {
      ...purchases[index],
      open: true,
      newItemsAdded: [],
    };
    purchase && dispatch(purchasesSlice.actions.setPurchase({ purchase }));
    callback && callback();
  } catch (e) {
    callback && callback(e);
    throw e;
  }
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
    const prevItem = itemsPurchased[itemIndex];
    const currentAmount =
      inventory.update.quantity * inventory.update.priceBought;
    const prevAmount = prevItem.update.quantity * prevItem.update.priceBought;
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

export const cancelPurchase = () => async (dispatch, getState) => {
  const { purchase } = getState();
  const path = ["edit", "newItemsAdded"];
  const newItemsAdded = R.pathOr([], path, purchase);
  newItemsAdded.length &&
    newItemsAdded.map((item) =>
      dispatch(inventorySlice.thunks.deleteInventory(item))
    );

  dispatch(purchasesSlice.actions.resetEdit());
};

export const createPurchase = (purchase) => async (dispatch) => {
  try {
    const { itemsPurchased: itemsList } = purchase;
    const itemsPurchased = JSON.stringify(itemsList);
    const itemsToUpdate = itemsList.map((item) => ({
      ...item,
      update: {
        priceBought: item.update.priceBought,
        priceToSell: item.update.priceToSell,
        quantity: item.update.quantity + item.update.prevQuantity,
      },
    }));
    const res = await makeRequest(
      `purchases`,
      "post",
      { ...purchase, itemsPurchased },
      dispatch
    );
    itemsToUpdate.map((item) =>
      dispatch(inventorySlice.thunks.updateInventory(item))
    );
    dispatch(purchasesSlice.actions.createPurchase({ purchase: res.data }));
  } catch (e) {
    throw e;
  }
};

export const deletePurchase =
  (purchaseId, index) => async (dispatch, getState) => {
    const {
      purchase: {
        edit: { itemsPurchased },
      },
    } = getState();
    try {
      const itemsToRevert = itemsPurchased.map((item) => ({
        ...item,
        update: {
          priceBought: item.update.prevPriceBought,
          priceToSell: item.update.prevPriceToSell,
          quantity: item.update.prevQuantity,
        },
      }));
      itemsToRevert.map((item) =>
        dispatch(inventorySlice.thunks.updateInventory(item))
      );
      await makeRequest(`purchases/${purchaseId}`, "delete", null, dispatch);
      dispatch(purchasesSlice.actions.deletePurchase({ index }));
    } catch (e) {
      throw e;
    }
  };

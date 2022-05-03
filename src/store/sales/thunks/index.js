import * as R from "ramda";
import salesSlice from "../slice";
import * as inventorySlice from "../../inventory";

import { makeRequest } from "../../../lib/makeRequest";

const itemPurchasedPath = ["sales", "edit", "itemList"];

export const getSales = () => async (dispatch) => {
  try {
    const { data } = await makeRequest("sales", "get", null, dispatch);
    const sales = data.map((item) => ({
      ...item,
      itemList: JSON.parse(item.itemList),
    }));
    dispatch(salesSlice.actions.setSales({ sales }));
  } catch (e) {
    throw e;
  }
};

export const setSale = (salesId, callback) => async (dispatch, getState) => {
  const {
    sales: { sales },
  } = getState();
  try {
    const sale = R.find(R.propEq("id", salesId))(sales);
    dispatch(salesSlice.actions.setSale({ sale }));
    callback && callback();
  } catch (e) {
    callback && callback(e);
    throw e;
  }
};

// export const deleteSale =
//   ({ salesId, index }) =>
//   async (dispatch) => {
//     try {
//       await makeRequest(`sales/${salesId}`, "delete", null, dispatch);
//       dispatch(salesSlice.actions.deleteSale({ index }));
//     } catch (e) {
//       throw e;
//     }
//   };

export const updateSale =
  ({ salesId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `sales/${salesId}`,
        "put",
        update,
        dispatch
      );
      dispatch(salesSlice.actions.updateSale({ sale: res.date, index }));
    } catch (e) {
      throw e;
    }
  };

export const createSale = (sale) => async (dispatch) => {
  try {
    const { itemList: itemsSold } = sale;
    const itemList = JSON.stringify(itemsSold);
    const itemsToUpdate = itemsSold.map((item) => ({
      ...item,
      update: { quantity: item.update.prevQuantity - item.update.quantity },
    }));

    const { data } = await makeRequest(
      `sales`,
      "post",
      { ...sale, itemList },
      dispatch
    );
    itemsToUpdate.map((item) =>
      dispatch(inventorySlice.thunks.updateInventory(item))
    );
    dispatch(salesSlice.actions.createSale({ sale: data }));
  } catch (e) {
    throw e;
  }
};

export const itemsToUpdate = (item, callback) => async (dispatch, getState) => {
  const state = getState();
  const itemList = R.path(itemPurchasedPath, state);
  const itemIndex = R.findIndex(R.propEq("inventoryId", item.inventoryId))(
    itemList
  );
  const amount = item.update.quantity * item.update.priceToSell;
  if (itemIndex >= 0) {
    const update = {
      ...item,
      update: {
        ...item.update,
        quantity: item.update.quantity + itemList[itemIndex].update.quantity,
        amount: item.update.amount + itemList[itemIndex].update.amount,
      },
    };

    dispatch(salesSlice.actions.updateAddedItem({ item: update, itemIndex }));
    dispatch(salesSlice.actions.updateSaleEditAmount({ amount }));
    return callback && callback();
  }
  const newItem = {
    ...item,
    update: {
      ...item.update,
      amount,
    },
  };
  dispatch(
    salesSlice.actions.itemsToUpdate({
      item: newItem,
    })
  );
  dispatch(salesSlice.actions.updateSaleEditAmount({ amount }));
  callback && callback();
};

export const updateAddedItem =
  (item, itemIndex, callback) => (dispatch, getState) => {
    const state = getState();
    const itemList = R.path(itemPurchasedPath, state);
    const prevItem = itemList[itemIndex];
    const currentAmount = item.update.quantity * item.update.priceToSell;
    const prevAmount = prevItem.update.quantity * prevItem.update.priceToSell;
    const amount = -prevAmount + currentAmount;
    dispatch(
      salesSlice.actions.updateAddedItem({
        item: { ...item, update: { ...item.update, amount: currentAmount } },
        itemIndex,
      })
    );
    dispatch(salesSlice.actions.updateSaleEditAmount({ amount }));
    callback && callback();
  };

export const deleteItemFromList =
  (update, itemIndex, callback) => async (dispatch) => {
    const { quantity, priceToSell } = update;
    const amount =
      Math.round((quantity * priceToSell + Number.EPSILON) * 100) / 100;
    dispatch(salesSlice.actions.deleteItemFromList({ index: itemIndex }));
    dispatch(salesSlice.actions.updatePurchaseEditAmount({ amount: -amount }));
    callback && callback();
  };

export const cancelSale = (callback) => async (dispatch) => {
  dispatch(salesSlice.actions.resetEdit());
  callback && callback();
};

export const deleteSale =
  (saleId, index, callback) => async (dispatch, getState) => {
    const state = getState();
    const itemList = R.path(itemPurchasedPath, state);
    try {
      const itemsToRevert = itemList.map((item) => ({
        ...item,
        update: {
          quantity: item.update.prevQuantity,
        },
      }));
      itemsToRevert.map((item) =>
        dispatch(inventorySlice.thunks.updateInventory(item))
      );
      await makeRequest(`sales/${saleId}`, "delete", null, dispatch);
      dispatch(salesSlice.actions.deleteSale({ index }));
      callback && callback();
    } catch (e) {
      callback && callback(e);
      throw e;
    }
  };

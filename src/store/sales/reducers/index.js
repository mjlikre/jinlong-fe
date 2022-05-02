import * as R from "ramda";

const salesPath = ["sales"];
const itemsSoldPath = ["edit", "itemList"];

export const setSales = (state, action) => {
  const { sales } = action.payload;
  return R.assocPath(["sales"], sales, state);
};

export const setSale = (state, action) => {
  const { sale } = action.payload;
  return R.assocPath(["sale"], sale, state);
};

export const setUpdate = (state, action) => {
  const { item } = action.payload;
  return R.assocPath(["update"], item, state);
};

export const deleteSale = (state, action) => {
  const { index } = action.payload;
  const prev = R.pathOr([], salesPath, state);
  return R.assocPath(salesPath, R.remove(index, 1, prev), state);
};

export const createSale = (state, action) => {
  const { sale } = action.payload;
  const prev = R.pathOr([], salesPath, state);
  return R.assocPath(salesPath, R.append(sale, prev), state);
};

export const updatesale = (state, action) => {
  const { sale, index } = action.payload;
  return R.assocPath(
    salesPath,
    R.insert(index, sale, R.remove(index, 1, R.pathOr([], salesPath, state))),
    state
  );
};

export const updateAddedItem = (state, action) => {
  const { item, itemIndex } = action.payload;
  const itemstoUpdate = R.insert(
    itemIndex,
    item,
    R.remove(itemIndex, 1, R.pathOr([], itemsSoldPath, state))
  );
  return R.assocPath(itemsSoldPath, itemstoUpdate, state);
};

export const setSaleClientId = (state, action) => {
  const { clientId } = action.payload;
  const path = ["edit", "clientId"];
  return R.assocPath(path, clientId, state);
};

export const updateSaleEditAmount = (state, action) => {
  const { amount } = action.payload;
  const path = ["edit", "amount"];
  const prev = R.pathOr(0, path, state);
  const newAmount = Math.round((prev + amount + Number.EPSILON) * 100) / 100;
  return R.assocPath(path, newAmount, state);
};

export const itemsToUpdate = (state, action) => {
  const { item } = action.payload;
  const prev = R.pathOr([], itemsSoldPath, state);
  return R.assocPath(itemsSoldPath, R.append(item, prev), state);
};

export const deleteItemFromList = (state, action) => {
  const { index } = action.payload;
  const prev = R.pathOr([], itemsSoldPath, state);
  return R.assocPath(itemsSoldPath, R.remove(index, 1, prev), state);
};

export const resetEdit = (state, action) => {
  const path = ["edit"];
  const initialEditState = {
    clientId: null,
    amount: 0,
    itemList: [],
    open: false,
  };
  return R.assocPath(path, initialEditState, state);
};

export const setSaleEdit = (state, action) => {
  const { saleState } = action.payload;
  const path = ["edit", "open"];
  return R.assocPath(path, saleState, state);
};

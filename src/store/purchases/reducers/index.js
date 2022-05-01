import * as R from "ramda";

const purchasesPath = ["purchases"];

export const setPurchases = (state, action) => {
  const { purchases } = action.payload;
  return R.assocPath(["purchases"], purchases, state);
};

export const setPurchase = (state, action) => {
  const { purchase } = action.payload;
  return R.assocPath(["edit"], purchase, state);
};

export const setUpdate = (state, action) => {
  const { inventory } = action.payload;
  return R.assocPath(["update"], inventory, state);
};

export const deletePurchase = (state, action) => {
  const { index } = action.payload;
  const prev = R.pathOr([], purchasesPath, state);
  return R.assocPath(purchasesPath, R.remove(index, 1, prev), state);
};

export const createPurchase = (state, action) => {
  const { purchase } = action.payload;
  const prev = R.pathOr([], purchasesPath, state);
  return R.assocPath(purchasesPath, R.append(purchase, prev), state);
};

export const updatePurchase = (state, action) => {
  const { purchase, index } = action.payload;
  return R.assocPath(
    purchasesPath,
    R.insert(
      index,
      purchase,
      R.remove(index, 1, R.pathOr([], purchasesPath, state))
    ),
    state
  );
};

export const setPurchaseEdit = (state, action) => {
  const { purchaseState } = action.payload;
  const path = ["edit", "open"];
  return R.assocPath(path, purchaseState, state);
};

export const deleteItemFromList = (state, action) => {
  const { index } = action.payload;
  const path = ["edit", "itemsPurchased"];
  const prev = R.pathOr([], path, state);
  return R.assocPath(path, R.remove(index, 1, prev), state);
};

export const inventoriesToUpdate = (state, action) => {
  const { inventory } = action.payload;
  const path = ["edit", "itemsPurchased"];
  const prev = R.pathOr([], path, state);
  return R.assocPath(path, R.append(inventory, prev), state);
};

export const updateAddedInventory = (state, action) => {
  const { inventory, itemIndex } = action.payload;
  const path = ["edit", "itemsPurchased"];
  const newInventoriesToUpdate = R.insert(
    itemIndex,
    inventory,
    R.remove(itemIndex, 1, R.pathOr([], path, state))
  );
  return R.assocPath(path, newInventoriesToUpdate, state);
};

export const setPurchaseEditProviderId = (state, action) => {
  const { providerId } = action.payload;
  const path = ["edit", "providerId"];
  return R.assocPath(path, providerId, state);
};

export const updatePurchaseEditAmount = (state, action) => {
  const { amount } = action.payload;
  const path = ["edit", "amount"];
  const prev = R.pathOr(0, path, state);
  const newAmount = Math.round((prev + amount + Number.EPSILON) * 100) / 100;
  return R.assocPath(path, newAmount, state);
};

export const newItemAdded = (state, action) => {
  const { item } = action.payload;
  const path = ["edit", "newItemsAdded"];
  const prev = R.pathOr([], path, state);
  return R.assocPath(path, R.append(item, prev), state);
};

export const resetEdit = (state, action) => {
  const path = ["edit"];
  const initialEditState = {
    providerId: null,
    amount: 0,
    itemsPurchased: [],
    open: false,
    newItemsAdded: [],
  };
  return R.assocPath(path, initialEditState, state);
};

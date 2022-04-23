import * as R from "ramda";

const purchasesPath = ["purchases"];

export const setPurchases = (state, action) => {
  const { purchases } = action.payload;
  return R.assocPath(["purchases"], purchases, state);
};

export const setPurchase = (state, action) => {
  const { purchase } = action.payload;
  return R.assocPath(["purchase"], purchase, state);
};

export const setUpdate = (state, action) => {
  const { purchase } = action.payload;
  return R.assocPath(["update"], purchase, state);
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

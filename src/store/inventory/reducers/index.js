import * as R from "ramda";

const inventoriesPath = ["inventories"];

export const setInventories = (state, action) => {
  const { inventories } = action.payload;
  return R.assocPath(["inventories"], inventories, state);
};

export const setInventory = (state, action) => {
  const { inventory } = action.payload;
  return R.assocPath(["inventory"], inventory, state);
};

export const deleteInventory = (state, action) => {
  const { index } = action.payload;
  const prev = R.pathOr([], inventoriesPath, state);
  return R.assocPath(inventoriesPath, R.remove(index, 1, prev), state);
};

export const createInventory = (state, action) => {
  const { inventory } = action.payload;
  const prev = R.pathOr([], inventoriesPath, state);
  return R.assocPath(inventoriesPath, R.append(inventory, prev), state);
};

export const updateInventory = (state, action) => {
  const { inventory, index } = action.payload;
  const newInventories = R.insert(
    index,
    inventory,
    R.remove(index, 1, R.pathOr([], inventoriesPath, state))
  );
  return R.assocPath(inventoriesPath, newInventories, state);
};

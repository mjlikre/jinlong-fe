import * as R from "ramda";

const salesPath = ["sales"];

export const setSales = (state, action) => {
  const { sales } = action.payload;
  return R.assocPath(["sales"], sales, state);
};

export const setSale = (state, action) => {
  const { sale } = action.payload;
  return R.assocPath(["sale"], sale, state);
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

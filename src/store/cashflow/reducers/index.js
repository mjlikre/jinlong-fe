import * as R from "rambda";

const cashflowsPath = ["cashflows"];

export const setCashflows = (state, action) => {
  const { cashflows } = action.payload;
  return R.assocPath(["cashflows"], cashflows, state);
};

export const setCashflow = (state, action) => {
  const { cashflow } = action.payload;
  return R.assocPath(["cashflow"], cashflow, state);
};

export const deleteCashflow = (state, action) => {
  const { index } = action.payload;

  const prev = R.pathOr([], cashflowsPath, state);
  return R.assocPath(cashflowsPath, R.remove(index, 1, prev), state);
};

export const createCashflow = (state, action) => {
  const { cashflow } = action.payload;
  const prev = R.pathOr([], cashflowsPath, state);
  return R.assocPath(cashflowsPath, R.append(cashflow, prev), state);
};

export const updateCashflow = (state, action) => {
  const { cashflow, index } = action.payload;

  return R.assocPath(
    cashflowsPath,
    R.insert(
      index,
      cashflow,
      R.remove(index, 1, R.pathOr([], cashflowsPath, state))
    ),
    state
  );
};

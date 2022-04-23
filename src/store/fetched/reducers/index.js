import * as R from "ramda";

export const setFetched = (state, action) => {
  const {
    payload: { fetched },
  } = action;
  return R.assocPath(["fetched"], fetched, state);
};

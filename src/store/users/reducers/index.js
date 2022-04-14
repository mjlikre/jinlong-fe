import * as R from "ramda";

export const setUsers = (state, action) => {
  const token = action.token;
  return R.assocPath(["auth"], token, state);
};

export const removeUser = (state, action) => {
  return R.assocPath(["auth"], null, state);
};

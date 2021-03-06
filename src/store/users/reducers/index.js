import * as R from "ramda";

export const setUsers = (state, action) => {
  const {
    payload: { id },
  } = action;
  return R.assocPath(["user"], id, state);
};

export const removeUser = (state) => {
  localStorage.removeItem("token");
  return R.assocPath(["user"], null, state);
};

export const setUserLang = (state, action) => {
  const { payload } = action;
  return R.assocPath(["lang"], payload.lang, state);
};

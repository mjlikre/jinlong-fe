import * as R from "ramda";

const providersPath = ["providers"];

export const setProviders = (state, action) => {
  const { providers } = action.payload;
  return R.assocPath(["providers"], providers, state);
};

export const setProvider = (state, action) => {
  const { provider } = action.payload;
  return R.assocPath(["provider"], provider, state);
};

export const deleteProvider = (state, action) => {
  const { index } = action.payload;
  const prev = R.pathOr([], providersPath, state);
  return R.assocPath(providersPath, R.remove(index, 1, prev), state);
};

export const createProvider = (state, action) => {
  const { provider } = action.payload;
  const prev = R.pathOr([], providersPath, state);
  return R.assocPath(providersPath, R.append(provider, prev), state);
};

export const updateProvider = (state, action) => {
  const { provider, index } = action.payload;
  const newProviders = R.insert(
    index,
    provider,
    R.remove(index, 1, R.pathOr([], providersPath, state))
  );
  return R.assocPath(providersPath, newProviders, state);
};

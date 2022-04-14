import * as R from "rambda";

const clientsPath = ["clients"];

export const setClients = (state, action) => {
  const { clients } = action.payload;
  return R.assocPath(["clients"], clients, state);
};

export const setClient = (state, action) => {
  const { client } = action.payload;
  return R.assocPath(["client"], client, state);
};

export const deleteClient = (state, action) => {
  const { index } = action.payload;
  const prev = R.pathOr([], clientsPath, state);
  return R.assocPath(clientsPath, R.remove(index, 1, prev), state);
};

export const createClient = (state, action) => {
  const { client } = action.payload;

  const prev = R.pathOr([], clientsPath, state);
  return R.assocPath(clientsPath, R.append(client, prev), state);
};

export const updateClient = (state, action) => {
  const { client, index } = action.payload;

  return R.assocPath(
    clientsPath,
    R.insert(
      index,
      client,
      R.remove(index, 1, R.pathOr([], clientsPath, state))
    ),
    state
  );
};

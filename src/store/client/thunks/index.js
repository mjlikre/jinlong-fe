import { makeRequest } from "../../../lib/makeRequest";
import clientSlice from "../slice";

export const getClients = () => async (dispatch) => {
  try {
    const res = await makeRequest(`client`, "get", null, dispatch);
    dispatch(clientSlice.actions.setClients({ clients: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getClient = (clientId) => async (dispatch) => {
  try {
    const { data } = await makeRequest(
      `client/${clientId}`,
      "get",
      null,
      dispatch
    );
    console.log(data, "here?");
    dispatch(clientSlice.actions.setClient({ client: data }));
  } catch (e) {
    throw e;
  }
};

export const deleteClient =
  ({ clientId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`client/${clientId}`, "delete", null, dispatch);
      dispatch(clientSlice.actions.deleteClient({ index }));
    } catch (e) {
      throw e;
    }
  };

export const updateClient =
  ({ clientId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `client/${clientId}`,
        "put",
        update,
        dispatch
      );
      dispatch(clientSlice.actions.updateClient({ client: res.data, index }));
    } catch (e) {
      throw e;
    }
  };

export const createClient = (client, callback) => async (dispatch) => {
  try {
    const res = await makeRequest(`client`, "post", client, dispatch);
    dispatch(clientSlice.actions.createClient({ client: res.data }));
    callback();
  } catch (e) {
    callback(e);
    throw e;
  }
};

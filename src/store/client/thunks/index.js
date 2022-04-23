import { makeRequest } from "../../../lib/makeRequest";
import clientSlice from "../slice";

export const getClients = () => async (dispatch) => {
  try {
    const res = await makeRequest(`client`, "get");
    dispatch(clientSlice.actions.setClients({ clients: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getClient =
  ({ clientId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`client/${clientId}`, "get");
      // const res = await axios.get(`http://localhost:3001/client/${clientId}`, {
      //   headers: { authorization: localStorage.getItem("token") },
      // });
      dispatch(clientSlice.actions.setClient({ client: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const deleteClient =
  ({ clientId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`inventory/${clientId}`, "delete");
      dispatch(clientSlice.actions.deleteClient({ index }));
    } catch (e) {
      throw e;
    }
  };

export const updateClient =
  ({ clientId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`client/${clientId}`, "patch", update);
      dispatch(clientSlice.actions.updateClient({ client: res.date, index }));
    } catch (e) {
      throw e;
    }
  };

export const createClient =
  ({ client }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`client`, "post", client);
      dispatch(clientSlice.actions.createClient({ client: res.data }));
    } catch (e) {
      throw e;
    }
  };

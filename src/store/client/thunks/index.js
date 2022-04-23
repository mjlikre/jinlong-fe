import { makeRequest } from "../../../lib/makeRequest";
import clientSlice from "../slice";

export const getClients =
  ({ callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`client`, "get");
      dispatch(clientSlice.actions.setClients({ clients: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const getClient =
  ({ clientId, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`client/${clientId}`, "get");
      // const res = await axios.get(`http://localhost:3001/client/${clientId}`, {
      //   headers: { authorization: localStorage.getItem("token") },
      // });
      dispatch(clientSlice.actions.setClient({ client: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const deleteClient =
  ({ clientId, index, callback }) =>
  async (dispatch) => {
    try {
      await makeRequest(`inventory/${clientId}`, "delete");
      dispatch(clientSlice.actions.deleteClient({ index }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const updateClient =
  ({ clientId, update, index, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`client/${clientId}`, "patch", update);
      dispatch(clientSlice.actions.updateClient({ client: res.date, index }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const createClient =
  ({ client, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`client`, "post", client);
      dispatch(clientSlice.actions.createClient({ client: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

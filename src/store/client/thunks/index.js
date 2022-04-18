import axios from "axios";
import clientSlice from "../slice";

export const getClients =
  ({ callback }) =>
  async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/client", {
        headers: { authorization: localStorage.getItem("token") },
      });
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
      const res = await axios.get(`http://localhost:3001/client/${clientId}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
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
      await axios.delete(`http://localhost:3001/client/${clientId}`, {
        headers: { authorization: localStorage.getItem("token") },
      });
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
      const res = await axios.patch(
        `http://localhost:3001/client/${clientId}`,
        update,
        { headers: { authorization: localStorage.getItem("token") } }
      );
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
      const res = await axios.post(`http://localhost:3001/client`, client, {
        headers: { authorization: localStorage.getItem("token") },
      });
      dispatch(clientSlice.actions.createClient({ client: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

import axios from "axios";
import providerSlice from '../slice'

export const getProviders = ({ callback }) => (dispatch, getState) => {
  try {
    const res = await axios.get(
        "http://localhost:3001/providers", 
        { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(providerSlice.actions.setProviders({providers: res.data}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const getProvider = ({ providerId, callback }) => (dispatch, getState) => {
    try {
      const res = await axios.get(
          `http://localhost:3001/providers/${providerId}`, 
          { headers: { authorization: localStorage.getItem("token") } },
      );
      dispatch(providerSlice.actions.setProvider({provider: res.data}))
      callback();
    } catch (e) {
      callback(e);
    }
};
  
export const deleteProvider = ({ providerId, index, callback }) => (dispatch, getState) => {
  try {
    await axios.delete(
        `http://localhost:3001/providers/${providerId}`, 
        { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(providerSlice.actions.deleteProvider({index}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const updateProvider = ({ providerId, update, index, callback }) => (dispatch, getState) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/providers/${providerId}`,
      update,
      { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(providerSlice.actions.updateProvider({provider: res.date, index}))
    callback();
  } catch (e) {
    callback(e);
  }
};

export const createProvider = ({ provider, callback }) => (dispatch, getState) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/providers`,
      provider,
      { headers: { authorization: localStorage.getItem("token") } },
    );
    dispatch(providerSlice.actions.createProvider({provider: res.data}))
    callback();
  } catch (e) {
    callback(e);
  }
};
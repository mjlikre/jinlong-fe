import { makeRequest } from "../../../lib/makeRequest";
import providerSlice from "../slice";

export const getProviders =
  ({ callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest("providers", "get");
      dispatch(providerSlice.actions.setProviders({ providers: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const getProvider =
  ({ providerId, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`providers/${providerId}`, "get");
      dispatch(providerSlice.actions.setProvider({ provider: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const deleteProvider =
  ({ providerId, index, callback }) =>
  async (dispatch) => {
    try {
      await makeRequest(`providers/${providerId}`, "delete");
      dispatch(providerSlice.actions.deleteProvider({ index }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const updateProvider =
  ({ providerId, update, index, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`providers/${providerId}`, "patch", update);
      dispatch(
        providerSlice.actions.updateProvider({ provider: res.date, index })
      );
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const createProvider =
  ({ provider, callback }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`providers`, "post", provider);
      dispatch(providerSlice.actions.createProvider({ provider: res.data }));
      callback();
    } catch (e) {
      callback(e);
    }
  };

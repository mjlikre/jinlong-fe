import { makeRequest } from "../../../lib/makeRequest";
import providerSlice from "../slice";

export const getProviders = () => async (dispatch) => {
  try {
    const res = await makeRequest("provider", "get", null, dispatch);
    dispatch(providerSlice.actions.setProviders({ providers: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getProvider =
  ({ providerId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `provider/${providerId}`,
        "get",
        null,
        dispatch
      );
      dispatch(providerSlice.actions.setProvider({ provider: res.data }));
    } catch (e) {
      throw e;
    }
  };

export const deleteProvider =
  ({ providerId, index }) =>
  async (dispatch) => {
    try {
      await makeRequest(`provider/${providerId}`, "delete");
      dispatch(providerSlice.actions.deleteProvider({ index }));
    } catch (e) {
      throw e;
    }
  };

export const updateProvider =
  ({ providerId, update, index }, callback) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(
        `provider/${providerId}`,
        "patch",
        update,
        dispatch
      );
      dispatch(
        providerSlice.actions.updateProvider({ provider: res.data, index })
      );
      callback();
    } catch (e) {
      callback(e);
      throw e;
    }
  };

export const createProvider =
  ({ provider }, callback) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`provider`, "post", provider, dispatch);
      dispatch(providerSlice.actions.createProvider({ provider: res.data }));
      callback();
    } catch (e) {
      callback(e);
      throw e;
    }
  };

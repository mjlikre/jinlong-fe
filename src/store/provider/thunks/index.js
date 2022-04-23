import { makeRequest } from "../../../lib/makeRequest";
import providerSlice from "../slice";

export const getProviders = () => async (dispatch) => {
  try {
    const res = await makeRequest("provider", "get");
    dispatch(providerSlice.actions.setProviders({ providers: res.data }));
  } catch (e) {
    throw e;
  }
};

export const getProvider =
  ({ providerId }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`provider/${providerId}`, "get");
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
  ({ providerId, update, index }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`provider/${providerId}`, "patch", update);
      dispatch(
        providerSlice.actions.updateProvider({ provider: res.date, index })
      );
    } catch (e) {
      throw e;
    }
  };

export const createProvider =
  ({ provider }) =>
  async (dispatch) => {
    try {
      const res = await makeRequest(`provider`, "post", provider);
      dispatch(providerSlice.actions.createProvider({ provider: res.data }));
    } catch (e) {
      throw e;
    }
  };

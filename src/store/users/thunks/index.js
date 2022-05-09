import { makeRequest } from "../../../lib/makeRequest";
import usersSlice from "../slice";

export const signin = (signinInfo, callback) => async (dispatch) => {
  try {
    const res = await makeRequest("users/login", "post", signinInfo, dispatch);
    localStorage.setItem("token", res.data.token);
    dispatch(usersSlice.actions.setUsers({ id: res.data.id }));
    callback();
  } catch (e) {
    throw e;
  }
};

export const signup = (signupInfo, callback) => async (dispatch) => {
  try {
    const res = await makeRequest("users", "post", signupInfo, dispatch);
    localStorage.setItem("token", res.data.token);
    dispatch(usersSlice.actions.setUsers({ id: res.data.id }));
    callback();
  } catch (e) {
    throw e;
  }
};

export const updateUser = (update, callback) => async (dispatch) => {
  try {
    const { data } = await makeRequest("users", "put", update, dispatch);
    localStorage.setItem("language", data.lang);
    localStorage.setItem("token", data.token);
    dispatch(usersSlice.actions.setUserLang({ lang: data.lang }));
    dispatch(usersSlice.actions.setUsers({ id: data.id }));
    callback && callback();
  } catch (e) {
    throw e;
  }
};

export const getUser = (callback) => async (dispatch) => {
  try {
    const { data } = await makeRequest("users", "get", null, dispatch);
    localStorage.setItem("language", data.lang);
    localStorage.setItem("token", data.token);
    dispatch(usersSlice.actions.setUserLang({ lang: data.lang }));
    dispatch(usersSlice.actions.setUsers({ id: data.id }));
    callback && callback();
  } catch (e) {
    throw e;
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(usersSlice.actions.removeUser());
};

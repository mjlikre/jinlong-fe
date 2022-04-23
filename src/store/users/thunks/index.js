import { makeRequest } from "../../../lib/makeRequest";
import usersSlice from "../slice";

export const signin = (signinInfo, callback) => async (dispatch) => {
  try {
    const res = await makeRequest("users/login", "post", signinInfo);
    localStorage.setItem("token", res.data.token);
    dispatch(usersSlice.actions.setUsers({ id: res.data.id }));
    callback();
  } catch (e) {
    callback(e);
  }
};

export const signup = (signupInfo, callback) => async (getState, dispatch) => {
  try {
    const res = await makeRequest("users", "post", signupInfo);
    localStorage.setItem("token", res.data.token);
    dispatch(usersSlice.actions.setUsers({ id: res.data.id }));
    callback();
  } catch (e) {
    callback(e);
  }
};

export const signout = () => () => {
  localStorage.removeItem("token");
};

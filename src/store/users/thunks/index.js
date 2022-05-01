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

export const signup = (signupInfo, callback) => async (getState, dispatch) => {
  try {
    const res = await makeRequest("users", "post", signupInfo, dispatch);
    localStorage.setItem("token", res.data.token);
    dispatch(usersSlice.actions.setUsers({ id: res.data.id }));
    console.log(res);
    callback();
  } catch (e) {
    throw e;
  }
};

export const signout = () => () => {
  localStorage.removeItem("token");
};

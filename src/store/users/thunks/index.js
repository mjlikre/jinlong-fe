import { makeRequest } from "../../../lib/makeRequest";

export const signin = (signinInfo, callback) => async () => {
  try {
    const res = await makeRequest("users/login", "post", signinInfo);
    localStorage.setItem("token", res.data.token);
    callback();
  } catch (e) {
    callback(e);
  }
};

export const signup = (signupInfo, callback) => async () => {
  try {
    const res = await makeRequest("users", "post", signupInfo);
    localStorage.setItem("token", res.data.token);
    callback();
  } catch (e) {
    callback(e);
  }
};

export const signout = () => (dispatch, getState) => {
  localStorage.removeItem("token");
};

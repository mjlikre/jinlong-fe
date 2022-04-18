import axios from "axios";

export const signin =
  ({ loginInfo, callback }) =>
  async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/users/login",
        loginInfo
      );
      localStorage.setItem("token", res.data.token);
      callback();
    } catch (e) {
      callback(e);
    }
  };

export const signup =
  ({ signupInfo, callback }) =>
  async () => {
    try {
      console.log(" i got to here");
      const res = await axios.post(
        "https://jinlong-backend.herokuapp.com/users",
        signupInfo
      );
      localStorage.setItem("token", res.data.token);

      callback();
    } catch (e) {
      callback(e);
    }
  };

export const signout = () => (dispatch, getState) => {
  localStorage.removeItem("token");
};

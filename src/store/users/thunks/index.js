import axios from "axios";

export const signin = ({ loginInfo, callback }) => (dispatch, getState) => {
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

export const signup = ({ signupInfo, callback }) => (dispatch, getState) => {
    try {
        const res = await axios.post("http://localhost:3001/users", signupInfo)
        localStorage.setItem("token", res.data.token)
        callback()
    } catch (e) {
        callback(e)
    }
}

export const signout = () => (dispatch, getState) => {
    localStorage.removeItem('token')
}
import axios from "axios";
import { baseUrl } from "./constants";
import { removeUser } from "../store/users/reducers";

export const makeRequest = async (url, verb, data, dispatch) => {
  try {
    return await axios({
      method: verb,
      url: baseUrl + url,
      data: data,
      headers: {
        authorization: localStorage.getItem("token"),
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      },
    });
  } catch (e) {
    e.response.status === 403 && dispatch(removeUser);
    throw e;
  }
};

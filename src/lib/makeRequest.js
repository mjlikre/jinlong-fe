import axios from "axios";
import { baseUrl } from "./constants";

export const makeRequest = async (url, verb, data) => {
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
};

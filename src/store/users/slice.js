import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";

export const initialState = {
  lang: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers,
});

export default usersSlice;

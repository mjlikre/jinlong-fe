import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";

export const initialState = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers,
});

export default usersSlice;

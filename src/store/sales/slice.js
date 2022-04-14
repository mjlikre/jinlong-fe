import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers,
});

export default salesSlice;

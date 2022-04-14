import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {};

const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers,
});

export default providersSlice;

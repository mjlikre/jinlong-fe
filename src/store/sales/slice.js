import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {
  update: false,
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers,
});

export default salesSlice;

import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {
  update: false,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers,
});

export default inventorySlice;

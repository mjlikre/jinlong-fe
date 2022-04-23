import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {
  update: false,
};

const cashflowSlice = createSlice({
  name: "cashflow",
  initialState,
  reducers,
});

export default cashflowSlice;

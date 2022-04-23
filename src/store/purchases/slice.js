import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {
  update: false,
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers,
});

export default purchasesSlice;

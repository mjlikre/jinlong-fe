import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {
  update: false,
  purchases: [],
  edit: {
    providerId: null,
    amount: 0,
    itemsPurchased: [],
    open: false,
  },
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers,
});

export default purchasesSlice;

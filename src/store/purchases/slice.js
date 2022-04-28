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
    newItemsAdded: [],
  },
};

const purchasesSlice = createSlice({
  name: "purchase",
  initialState,
  reducers,
});

export default purchasesSlice;

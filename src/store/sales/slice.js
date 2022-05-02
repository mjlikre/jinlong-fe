import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {
  update: false,
  edit: {
    clientId: null,
    amount: 0,
    itemList: [],
    open: false,
  },
  sales: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers,
});

export default salesSlice;

import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export const initialState = {
  update: false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers,
});

export default clientSlice;

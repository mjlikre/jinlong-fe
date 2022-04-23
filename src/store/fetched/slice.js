import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";

export const initialState = {
  fetched: false,
};

const fetchedSlice = createSlice({
  name: "fetched",
  initialState,
  reducers,
});

export default fetchedSlice;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BaseLayout from "../layouts/baseLayouts";
import * as providersSlice from "../../store/provider";
const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(providersSlice.thunks.getProviders());
  }, []);
  return <BaseLayout>doing initial fetch here</BaseLayout>;
};

export default Main;

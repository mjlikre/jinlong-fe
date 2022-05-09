import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchedSelector } from "../../../store/fetched/selectors";
import * as fetchedSlice from "../../../store/fetched";

import Navbar from "../navbar";
import { userSelector } from "../../../store/users/selectors";

const BaseLayouts = ({ children, className }) => {
  const navigate = useNavigate();
  const authentication = localStorage.getItem("token");
  const user = useSelector(userSelector);
  const fetched = useSelector(fetchedSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    !user && !authentication && navigate("/signin");
  }, [user, authentication]);

  useEffect(() => {
    !fetched && dispatch(fetchedSlice.thunks.fetch());
  }, [fetched]);

  return (
    <>
      <Navbar />
      <div className={`py-10 px-24 h-screen bg-slate-100 ${className}`}>
        {children}
      </div>
    </>
  );
};

export default BaseLayouts;

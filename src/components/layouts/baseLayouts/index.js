import React, { useEffect } from "react";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

const BaseLayouts = ({ children, className }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authentication = localStorage.getItem("token");
    // !authentication && navigate("/signin");
  });
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

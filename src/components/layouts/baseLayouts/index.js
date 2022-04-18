import React from "react";
import Navbar from "../navbar";
const BaseLayouts = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default BaseLayouts;

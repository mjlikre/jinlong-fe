import React from "react";
import { buildString } from "../../../lib/utils";

const Button = ({ text, onClick, type }) => {
  return (
    <button
      className={buildString({
        "inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2": true,
        "bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500":
          type === "normal",
        "bg-red-100 hover:bg-red-300 focus-visible:ring-red-500":
          type === "cancel",
      })}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

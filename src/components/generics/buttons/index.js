import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

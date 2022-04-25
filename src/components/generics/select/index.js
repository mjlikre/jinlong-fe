import React from "react";
import { List } from "react-feather";

const Select = ({ renderOptions, label, onChange }) => {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          {label}
        </label>
      </div>
      <div className="md:w-2/3 relative">
        <select
          onChange={onChange}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value={null}> -- -- </option>
          {renderOptions}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <List className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Select;

import React from "react";

const Table = ({ renderTHead, renderTBody }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-96">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-100">
          {renderTHead()}
        </thead>
        <tbody>{renderTBody()}</tbody>
      </table>
    </div>
  );
};

export default Table;

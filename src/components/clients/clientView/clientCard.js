import React, { useMemo } from "react";
import * as R from "ramda";

import { buildString } from "../../../lib/utils";

const ClientCard = ({ client, className }) => {
  const amountSpent = useMemo(() =>
    R.reduce((acc, item) => R.add(acc, item.amount), 0, client.purchase)
  );
  return (
    <div
      className={buildString({
        [`max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700`]: true,
        [className]: true,
      })}
    >
      <div className="flex flex-col items-center pt-4 pb-10 ">
        <div className="flex flex-col items-start">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {client.firstName} {client.lastName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Client since {new Date(client.createdAt).toLocaleDateString()}
          </span>
          <span className="text-md text-gray-900 dark:text-white">
            Phone: {client.phone}
          </span>
          <span className="text-md text-gray-900 dark:text-white">
            Email: {client.email}
          </span>
          <span className="text-md text-gray-900 dark:text-white">
            Amount Spent: ${amountSpent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;

import React from "react";

import { buildString } from "../../lib/utils";
import { generic, client, provider } from "../../lib/language";

const Card = ({
  name,
  phone,
  date,
  email,
  amount,
  lang,
  client: fromClient,
  className,
}) => {
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
            {name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {fromClient ? client.since[lang] : provider.since[lang]}{" "}
            {new Date(date).toLocaleDateString()}
          </span>
          <span className="text-md text-gray-900 dark:text-white">
            {generic.phone[lang]}: {phone}
          </span>
          <span className="text-md text-gray-900 dark:text-white">
            {generic.email[lang]}: {email}
          </span>
          <span className="text-md text-gray-900 dark:text-white">
            {generic.amountSpent[lang]}: {amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;

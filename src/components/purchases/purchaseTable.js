import React from "react";
import { Link } from "react-router-dom";
import { generic } from "../../lib/language";

import Table from "../generics/table";

const PurchaseTable = ({ items, lang }) => {
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        #
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.date[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.amount[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.view[lang]}
      </th>
    </tr>
  );

  const renderTBody = () =>
    items.map((purchase, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {index + 1}
        </th>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {new Date(purchase.createdAt).toLocaleDateString()}
        </th>
        <td className="px-6 py-4">{purchase.amount}</td>
        <td className="px-6 py-4">
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={`/purchases/${purchase.id}/${index}`}
          >
            {generic.view[lang]}
          </Link>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default PurchaseTable;

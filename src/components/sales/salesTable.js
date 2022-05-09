import React from "react";

import { Link } from "react-router-dom";
import { generic } from "../../lib/language";

import Table from "../generics/table";

const SalesTable = ({ sales = [], fromSales, lang }) => {
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
      {fromSales && (
        <th scope="col" className="px-6 py-3">
          {generic.client[lang]}
        </th>
      )}
      <th scope="col" className="px-6 py-3">
        {generic.view[lang]}
      </th>
    </tr>
  );

  const renderTBody = () =>
    sales.map((sale, index) => (
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
          {new Date(sale.createdAt).toLocaleDateString()}
        </th>

        <td className="px-6 py-4">{sale.amount}</td>
        {fromSales && (
          <td className="px-6 py-4">
            {sale.client.firstName} {sale.client.lastName}
          </td>
        )}

        <td className="px-6 py-4">
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={`/sales/${sale.id}/${index}`}
          >
            {generic.view[lang]}
          </Link>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default SalesTable;

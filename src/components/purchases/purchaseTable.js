import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { purchasesSelector } from "../../store/purchases/selectors";

import Table from "../generics/table";

const PurchaseTable = () => {
  const purchases = useSelector(purchasesSelector) || [];
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        #
      </th>
      <th scope="col" className="px-6 py-3">
        Date
      </th>
      <th scope="col" className="px-6 py-3">
        Amount
      </th>
      <th scope="col" className="px-6 py-3">
        View
      </th>
    </tr>
  );

  const renderTBody = () =>
    purchases.map((purchase, index) => (
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
          {purchase.createdAt}
        </th>
        <td className="px-6 py-4">{purchase.amount}</td>
        <td className="px-6 py-4">
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={`/purchases/${purchase.id}/${index}`}
          >
            View
          </Link>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default PurchaseTable;

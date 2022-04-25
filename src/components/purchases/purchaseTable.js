import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { purchasesSelector } from "../../store/purchases/selectors";
import * as purchasesSlice from "../../store/purchases";

import Table from "../generics/table";

const PurchaseTable = () => {
  const purchases = useSelector(purchasesSelector) || [];
  const dispatch = useDispatch();
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        Date
      </th>
      <th scope="col" className="px-6 py-3">
        Amount
      </th>
      <th scope="col" className="px-6 py-3">
        Provider
      </th>
      <th scope="col" className="px-6 py-3">
        Open
      </th>
      <th scope="col" className="px-6 py-3">
        Edit
      </th>
    </tr>
  );

  const setPurchaseUpdate = (purchase) => () =>
    dispatch(purchasesSlice.actions.setUpdate({ purchase }));
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
          {purchase.createdAt}
        </th>
        <td className="px-6 py-4">{purchase.amount}</td>
        <td className="px-6 py-4">???</td>
        <td className="px-6 py-4">
          {" "}
          <div
            onClick={setPurchaseUpdate({ ...purchase, index })}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Open
          </div>
        </td>
        <td className="px-6 py-4">
          <div
            onClick={setPurchaseUpdate({ ...purchase, index })}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </div>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default PurchaseTable;

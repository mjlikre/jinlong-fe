import React from "react";
import { useSelector } from "react-redux";

import { inventoriesSelector } from "../../store/inventory/selectors";

import Table from "../generics/table";

const InventoryTable = () => {
  const inventories = useSelector(inventoriesSelector) || [];
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        Product name
      </th>
      <th scope="col" className="px-6 py-3">
        Quantity
      </th>
      <th scope="col" className="px-6 py-3">
        Sell Price
      </th>
      <th scope="col" className="px-6 py-3">
        <span>Edit</span>
      </th>
    </tr>
  );

  const renderTBody = () =>
    inventories.map((inventory, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {inventory.productName}
        </th>
        <td className="px-6 py-4">{inventory.priceBought}</td>
        <td className="px-6 py-4">{inventory.priceToSell}</td>
        <td className="px-6 py-4">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default InventoryTable;

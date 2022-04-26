import React from "react";
import { useDispatch } from "react-redux";

import * as inventorySlice from "../../../store/inventory";

import Table from "../../generics/table";

const PurchaseContent = ({ inventories = [] }) => {
  const dispatch = useDispatch();
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
        Buy Price
      </th>
      <th scope="col" className="px-6 py-3">
        Edit
      </th>
      <th scope="col" className="px-6 py-3">
        Remove
      </th>
    </tr>
  );

  const setInventoryUpdate = (inventory) => () => {
    return dispatch(inventorySlice.actions.setUpdate({ inventory }));
  };

  const deleteInventoryToUpdate = (index) => () => {
    return dispatch(inventorySlice.actions.deleteInventoryToUpdate({ index }));
  };
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
          {inventory.update.productName}
        </th>
        <td className="px-6 py-4">{inventory.update.quantity}</td>
        <td className="px-6 py-4">{inventory.update.priceToSell}</td>
        <td className="px-6 py-4">{inventory.update.priceBought}</td>
        <td className="px-6 py-4">
          <div
            onClick={setInventoryUpdate({ ...inventory, itemIndex: index })}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </div>
        </td>
        <td className="px-6 py-4">
          <div
            onClick={deleteInventoryToUpdate(index)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Remove
          </div>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default PurchaseContent;

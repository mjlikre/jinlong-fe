import React from "react";
import { useDispatch } from "react-redux";

import { MinusCircle, Edit } from "react-feather";

import * as purchaseSlice from "../../../store/purchases";

import Table from "../../generics/table";

const PurchaseContent = ({ inventories = [] }) => {
  const dispatch = useDispatch();
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3 text-center">
        Product name
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Quantity
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Sell Price
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Buy Price
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Edit
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        Remove
      </th>
    </tr>
  );

  const setInventoryUpdate = (inventory) => () => {
    return dispatch(purchaseSlice.actions.setUpdate({ inventory }));
  };

  const deleteInventoryToUpdate = (index) => () => {
    return dispatch(purchaseSlice.actions.deleteItemFromList({ index }));
  };
  const renderTBody = () =>
    inventories.map((inventory, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-center"
        >
          {inventory.update.productName}
        </th>
        <td className="px-6 py-4 text-center">{inventory.update.quantity}</td>
        <td className="px-6 py-4 text-center">
          {inventory.update.priceToSell}
        </td>
        <td className="px-6 py-4 text-center">
          {inventory.update.priceBought}
        </td>
        <td className="px-6 py-4 text-center">
          <div
            onClick={setInventoryUpdate({ ...inventory, itemIndex: index })}
            className="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-100 flex justify-center"
          >
            <Edit className="w-6 h-6" />
          </div>
        </td>
        <td className="px-6 py-4">
          <div
            onClick={deleteInventoryToUpdate(index)}
            className="font-medium text-red-50 dark:text-red-400 hover:text-red-100 flex justify-center"
          >
            <MinusCircle className="w-6 h-6" />
          </div>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default PurchaseContent;

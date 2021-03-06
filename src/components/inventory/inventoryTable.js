import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { inventoriesSelector } from "../../store/inventory/selectors";
import * as inventorySlice from "../../store/inventory";

import Table from "../generics/table";

import { generic } from "../../lib/language";

const InventoryTable = ({ lang }) => {
  const inventories = useSelector(inventoriesSelector) || [];
  const dispatch = useDispatch();
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        #
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.productName[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.quantity[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.priceToSell[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        <span>{generic.edit[lang]}</span>
      </th>
    </tr>
  );

  const setInventoryUpdate = (inventory) => () =>
    dispatch(inventorySlice.actions.setUpdate({ inventory }));
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
          {index + 1}
        </th>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {inventory.productName}
        </th>
        <td className="px-6 py-4">{inventory.quantity}</td>
        <td className="px-6 py-4">{inventory.priceToSell}</td>
        <td className="px-6 py-4">
          <div
            onClick={setInventoryUpdate({ ...inventory, index })}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {generic.edit[lang]}
          </div>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default InventoryTable;

import React from "react";
import { useDispatch } from "react-redux";

import { MinusCircle, Edit } from "react-feather";

import * as salesSlice from "../../../store/sales";

import Table from "../../generics/table";
import { generic } from "../../../lib/language";

const PurchaseContent = ({ itemList = [], viewOnly, lang }) => {
  const dispatch = useDispatch();
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3 text-center">
        {generic.productName[lang]}
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        {generic.quantity[lang]}
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        {generic.price[lang]}
      </th>
      <th scope="col" className="px-6 py-3 text-center">
        {generic.amount[lang]}
      </th>
      {!viewOnly && (
        <th scope="col" className="px-6 py-3 text-center">
          {generic.edit[lang]}
        </th>
      )}
      {!viewOnly && (
        <th scope="col" className="px-6 py-3 text-center">
          {generic.delete[lang]}
        </th>
      )}
    </tr>
  );

  const setItemUpdate = (item) => () => {
    return dispatch(salesSlice.actions.setUpdate({ item }));
  };

  const deleteItemToUpdate = (item) => () => {
    return dispatch(salesSlice.thunks.deleteItemFromList(item));
  };
  const renderTBody = () =>
    itemList.map((item, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-center"
        >
          {item.update.productName}
        </th>
        <td className="px-6 py-4 text-center">{item.update.quantity}</td>
        <td className="px-6 py-4 text-center">{item.update.priceToSell}</td>
        <td className="px-6 py-4 text-center">{item.update.amount}</td>
        {!viewOnly && (
          <td className="px-6 py-4 text-center">
            <div
              onClick={setItemUpdate({ ...item, itemIndex: index })}
              className="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-100 flex justify-center"
            >
              <Edit className="w-6 h-6" />
            </div>
          </td>
        )}

        {!viewOnly && (
          <td className="px-6 py-4">
            <div
              onClick={deleteItemToUpdate({
                ...item,
                itemIndex: index,
              })}
              className="font-medium text-red-50 dark:text-red-400 hover:text-red-100 flex justify-center"
            >
              <MinusCircle className="w-6 h-6" />
            </div>
          </td>
        )}
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default PurchaseContent;

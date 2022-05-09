import React from "react";
import { generic } from "../../../lib/language";

import Table from "../../generics/table";

const ProductTable = ({ products, lang }) => {
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
    </tr>
  );
  const renderTBody = () =>
    products.map((inventory, index) => (
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
      </tr>
    ));
  return (
    <div className="mt-8">
      <p className="text-xl"></p>
      <Table renderTHead={renderTHead} renderTBody={renderTBody} />
    </div>
  );
};

export default ProductTable;

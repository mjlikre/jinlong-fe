import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { providersSelector } from "../../store/provider/selectors";
import * as providerSlice from "../../store/provider";

import Table from "../generics/table";

const ProviderTable = () => {
  const providers = useSelector(providersSelector) || [];
  const dispatch = useDispatch();
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        Provider
      </th>
      <th scope="col" className="px-6 py-3">
        Contact Name
      </th>
      <th scope="col" className="px-6 py-3">
        Phone
      </th>
      <th scope="col" className="px-6 py-3">
        Email
      </th>
      <th scope="col" className="px-6 py-3">
        <span>Edit</span>
      </th>
      <th scope="col" className="px-6 py-3">
        <span>View</span>
      </th>
    </tr>
  );

  const setProviderUpdate = (provider) => () =>
    dispatch(providerSlice.actions.setUpdate({ provider }));
  const renderTBody = () =>
    providers.map((provider, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {provider.providerName}
        </th>
        <td className="px-6 py-4">
          {provider.contactFirstName} {provider.contactLastName}
        </td>
        <td className="px-6 py-4">{provider.contactPhone}</td>
        <td className="px-6 py-4">{provider.contactEmail}</td>
        <td className="px-6 py-4">
          <div
            onClick={setProviderUpdate({ ...provider, index })}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </div>
        </td>
        <td className="px-6 py-4">
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={`/clients/${provider.id}/${index}`}
          >
            View
          </Link>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default ProviderTable;

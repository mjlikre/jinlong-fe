import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { providersSelector } from "../../store/provider/selectors";
import * as providerSlice from "../../store/provider";

import Table from "../generics/table";
import { generic, provider } from "../../lib/language";

const ProviderTable = ({ lang }) => {
  const providers = useSelector(providersSelector) || [];
  const dispatch = useDispatch();
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        #
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.provider[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {provider.contact.fitstName[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.phone[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {generic.email[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        <span>{generic.edit[lang]}</span>
      </th>
      <th scope="col" className="px-6 py-3">
        <span>{generic.view[lang]}</span>
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
          {index + 1}
        </th>
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
            {generic.edit[lang]}
          </div>
        </td>
        <td className="px-6 py-4">
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={`/providers/${provider.id}/${index}`}
          >
            {generic.view[lang]}
          </Link>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default ProviderTable;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import * as clientsSlice from "../../store/client";
import { clientsSelector } from "../../store/client/selectors";

import Table from "../generics/table";

import { generic, client } from "../../lib/language";

const ClientsTable = ({ lang }) => {
  const dispatch = useDispatch();
  const clients = useSelector(clientsSelector) || [];
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        {client.name[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {client.phone[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        {client.email[lang]}
      </th>
      <th scope="col" className="px-6 py-3">
        <span>{generic.edit[lang]}</span>
      </th>
      <th scope="col" className="px-6 py-3">
        <span>{generic.view[lang]}</span>
      </th>
    </tr>
  );

  const setClientUpdate = (client) => () =>
    dispatch(clientsSlice.actions.setUpdate({ client }));

  const renderTBody = () =>
    clients.map((client, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {client.firstName} {client.lastName}
        </th>
        <td className="px-6 py-4">{client.phone}</td>
        <td className="px-6 py-4">{client.email}</td>
        <td className="px-6 py-4">
          <div
            onClick={setClientUpdate({ ...client, index })}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {generic.edit[lang]}
          </div>
        </td>
        <td className="px-6 py-4">
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to={`/clients/${client.id}/${index}`}
          >
            {generic.view[lang]}
          </Link>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default ClientsTable;

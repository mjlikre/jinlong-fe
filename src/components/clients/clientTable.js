import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { clientsSelector } from "../../store/client/selectors";
import * as clientSlice from "../../store/client";

import Table from "../generics/table";

const ClientsTable = () => {
  const clients = useSelector(clientsSelector) || [];
  const dispatch = useDispatch();
  const renderTHead = () => (
    <tr>
      <th scope="col" className="px-6 py-3">
        Client Name
      </th>
      <th scope="col" className="px-6 py-3">
        Client Phone
      </th>
      <th scope="col" className="px-6 py-3">
        Client Email
      </th>
      <th scope="col" className="px-6 py-3">
        <span>Edit</span>
      </th>
    </tr>
  );

  const setClientUpdate = (client) => () =>
    dispatch(clientSlice.actions.setUpdate({ client }));
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
            Edit
          </div>
        </td>
      </tr>
    ));
  return <Table renderTHead={renderTHead} renderTBody={renderTBody} />;
};

export default ClientsTable;

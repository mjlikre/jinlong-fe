import React from "react";

import { Outlet, useParams } from "react-router-dom";

import BaseLayout from "../layouts/baseLayouts";
import ClientInput from "./clientInput";
import ClientsTable from "./clientTable";
import UpdateClient from "./updateClient";

const Clients = () => {
  const { clientId } = useParams();
  return (
    <BaseLayout>
      <div className="w-4/6 m-auto">
        {!clientId ? (
          <>
            <ClientInput />
            <div className="w-full pt-10">
              <ClientsTable />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
      <UpdateClient />
    </BaseLayout>
  );
};

export default Clients;

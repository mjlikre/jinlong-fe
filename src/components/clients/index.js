import React from "react";

import BaseLayout from "../layouts/baseLayouts";
import ClientInput from "./clientInput";
import ClientsTable from "./clientTable";
import UpdateClient from "./updateClient";

const Clients = () => {
  return (
    <BaseLayout>
      <div className="w-4/6 m-auto">
        <ClientInput />
        <div className="w-full pt-10">
          <ClientsTable />
        </div>
      </div>
      <UpdateClient />
    </BaseLayout>
  );
};

export default Clients;

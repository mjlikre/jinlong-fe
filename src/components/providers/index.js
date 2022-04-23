import React from "react";
import BaseLayout from "../layouts/baseLayouts";
import ProviderInput from "./providerInput";
import ProviderTable from "./providerTable";
import UpdateProvider from "./updateProvider";
const Providers = () => {
  return (
    <BaseLayout>
      <div className="w-4/6 m-auto">
        <ProviderInput />
        <div className="w-full pt-10">
          <ProviderTable />
        </div>
      </div>
      <UpdateProvider />
    </BaseLayout>
  );
};

export default Providers;

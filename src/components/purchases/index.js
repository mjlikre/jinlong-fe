import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import BaseLayout from "../layouts/baseLayouts";
import PurchaseTable from "./purchaseTable";

const Purchases = () => {
  const { purchaseId } = useParams();

  return (
    <BaseLayout>
      <div className="w-4/6 m-auto">
        {!purchaseId ? (
          <>
            <Link
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              to="/purchases/new"
            >
              New Purchase
            </Link>
            <div className="w-full pt-10">
              <PurchaseTable />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </BaseLayout>
  );
};

export default Purchases;

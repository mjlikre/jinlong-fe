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
            <Link to="/purchases/new">New Purchase</Link>
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

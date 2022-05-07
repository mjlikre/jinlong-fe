import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";

import { salesSelector } from "../../store/sales/selectors";

import BaseLayout from "../layouts/baseLayouts";
import SalesTable from "./salesTable";

const Sales = () => {
  const { saleId } = useParams();
  const sales = useSelector(salesSelector);
  return (
    <BaseLayout>
      <div className="w-4/6 m-auto">
        {!saleId ? (
          <>
            <Link
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              to="/sales/new"
            >
              New Sale
            </Link>
            <div className="w-full pt-10">
              <SalesTable sales={sales} fromSales />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </BaseLayout>
  );
};

export default Sales;

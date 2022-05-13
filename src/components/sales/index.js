import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { Plus } from "react-feather";

import { salesSelector } from "../../store/sales/selectors";

import BaseLayout from "../layouts/baseLayouts";
import SalesTable from "./salesTable";
import { generic, sales as salesLang } from "../../lib/language";
import { userDisplayLanguageSelector } from "../../store/users/selectors";
const Sales = () => {
  const language = useSelector(userDisplayLanguageSelector);
  const { saleId } = useParams();
  const sales = useSelector(salesSelector);
  return (
    <BaseLayout>
      <div className="w-full m-auto">
        <div className="text-2xl">{generic.salesPage[language]}</div>
        {!saleId ? (
          <div className="w-full flex pt-10">
            <div className="w-8/12">
              <SalesTable sales={sales} fromSales lang={language} />
            </div>
            <div className="w-3/12 flex items-start">
              <Link
                className="inline-flex items-start justify-center px-4 py-2 mx-auto text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                to="/sales/new"
              >
                <Plus />
                {salesLang.add[language]}
              </Link>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </BaseLayout>
  );
};

export default Sales;

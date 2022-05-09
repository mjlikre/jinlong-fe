import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus } from "react-feather";

import { purchasesSelector } from "../../store/purchases/selectors";

import BaseLayout from "../layouts/baseLayouts";
import PurchaseTable from "./purchaseTable";
import { purchase } from "../../lib/language";
import { userDisplayLanguageSelector } from "../../store/users/selectors";

import { generic } from "../../lib/language";

const Purchases = () => {
  const { purchaseId } = useParams();
  const purchases = useSelector(purchasesSelector) || [];
  const lang = useSelector(userDisplayLanguageSelector);

  return (
    <BaseLayout>
      <div className="w-full m-auto">
        <div className="text-2xl">{generic.purchasePage[lang]}</div>
        {!purchaseId ? (
          <div className="w-full flex pt-10">
            <div className="w-8/12">
              <PurchaseTable items={purchases} lang={lang} />
            </div>
            <div className="w-3/12 flex items-start">
              <Link
                className="inline-flex items-start justify-center px-4 py-2 mx-auto text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                to="/purchases/new"
              >
                <Plus />
                {purchase.add[lang]}
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

export default Purchases;

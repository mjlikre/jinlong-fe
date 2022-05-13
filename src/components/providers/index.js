import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { userDisplayLanguageSelector } from "../../store/users/selectors";

import BaseLayout from "../layouts/baseLayouts";
import ProviderInput from "./providerInput";
import ProviderTable from "./providerTable";
import UpdateProvider from "./updateProvider";

import { generic } from "../../lib/language";

const Providers = () => {
  const lang = useSelector(userDisplayLanguageSelector);
  const { providerId, index } = useParams();
  return (
    <BaseLayout>
      <div className="w-full m-auto">
        <div className="text-2xl">{generic.providerPage[lang]}</div>
        {!providerId ? (
          <div className="w-full flex pt-10">
            <div className="w-8/12">
              <ProviderTable lang={lang} />
            </div>
            <div className="w-3/12 inline-flex justify-center items-start">
              <ProviderInput lang={lang} />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      <UpdateProvider lang={lang} />
    </BaseLayout>
  );
};

export default Providers;

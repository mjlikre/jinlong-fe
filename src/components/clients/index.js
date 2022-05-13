import React from "react";
import { useSelector } from "react-redux";

import { Outlet, useParams } from "react-router-dom";
import { userDisplayLanguageSelector } from "../../store/users/selectors";

import BaseLayout from "../layouts/baseLayouts";
import ClientInput from "./clientInput";
import ClientsTable from "./clientTable";
import UpdateClient from "./updateClient";

import { generic } from "../../lib/language";

const Clients = () => {
  const language = useSelector(userDisplayLanguageSelector);
  const { clientId } = useParams();
  return (
    <BaseLayout>
      <div className="w-ful m-auto">
        <div className="text-2xl">{generic.clientPage[language]}</div>
        {!clientId ? (
          <div className="w-full flex pt-10">
            <div className="w-8/12">
              <ClientsTable lang={language} />
            </div>
            <div className="w-3/12 inline-flex justify-center items-start">
              <ClientInput lang={language} />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <UpdateClient lang={language} />
    </BaseLayout>
  );
};

export default Clients;

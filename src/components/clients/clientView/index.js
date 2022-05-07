import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as clientsSlice from "../../../store/client";
import { clientSelector } from "../../../store/client/selectors";
import SalesTable from "../../sales/salesTable";
import ClientCard from "./clientCard";

const ClientView = () => {
  const { clientId, index } = useParams();
  const dispatch = useDispatch();
  const client = useSelector(clientSelector);
  useEffect(() => {
    !client && dispatch(clientsSlice.thunks.getClient(clientId));
  }, [client]);

  return (
    <div className="flex flex-col w-full justify-center">
      {client && (
        <>
          <ClientCard client={client} className="mb-8 mx-auto w-6/12 " />
          <SalesTable sales={client.purchase} />
        </>
      )}
    </div>
  );
};

export default ClientView;

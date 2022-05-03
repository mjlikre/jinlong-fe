import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as clientsSlice from "../../../store/client";
import { clientSelector } from "../../../store/client/selectors";
import ClientCard from "./clientCard";

const ClientView = () => {
  const { clientId, index } = useParams();
  const dispatch = useDispatch();
  const client = useSelector(clientSelector);
  useEffect(() => {
    !client && dispatch(clientsSlice.thunks.getClient(clientId));
  }, [client]);

  console.log(client);
  return (
    <div>
      <ClientCard client={client} />
    </div>
  );
};

export default ClientView;

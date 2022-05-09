import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as clientsSlice from "../../../store/client";
import { clientSelector } from "../../../store/client/selectors";
import { userDisplayLanguageSelector } from "../../../store/users/selectors";
import View from "../../views";

const ClientView = () => {
  const language = useSelector(userDisplayLanguageSelector);
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const client = useSelector(clientSelector);
  useEffect(() => {
    !client && dispatch(clientsSlice.thunks.getClient(clientId));
  }, [client]);

  const { firstName, lastName, phone, email, createdAt, purchase } = client;

  return (
    client && (
      <View
        name={`${firstName} ${lastName}`}
        phone={phone}
        email={email}
        date={createdAt}
        tableElem={purchase}
        client
        lang={language}
      />
    )
  );
};

export default ClientView;

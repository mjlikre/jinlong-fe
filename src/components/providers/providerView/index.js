import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { generic } from "../../../lib/language";

import * as providersSlice from "../../../store/provider";
import { providerSelector } from "../../../store/provider/selectors";
import { userDisplayLanguageSelector } from "../../../store/users/selectors";

import View from "../../views";
import ProductTable from "./productTable";

const ProviderView = () => {
  const language = useSelector(userDisplayLanguageSelector);
  const { providerId } = useParams();
  const dispatch = useDispatch();
  const provider = useSelector(providerSelector);
  useEffect(() => {
    (!provider || provider.id !== providerId) &&
      dispatch(providersSlice.thunks.getProvider({ providerId }));
  }, [provider]);

  const {
    contactFirstName,
    contactLastName,
    contactPhone,
    contactEmail,
    createdAt,
    InventoryPurchase: purchase,
    products,
  } = provider;

  return (
    provider && (
      <View
        name={`${contactFirstName} ${contactLastName}`}
        phone={contactPhone}
        email={contactEmail}
        date={createdAt}
        tableElem={purchase}
        provider
        lang={language}
      >
        <p className="text-xl">{generic.productList[language]}</p>
        <ProductTable products={products} lang={language} />
      </View>
    )
  );
};

export default ProviderView;

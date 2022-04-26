import React, { useEffect, useMemo, useState } from "react";
import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { purchaseSelector } from "../../../store/purchases/selectors";
import { providersSelector } from "../../../store/provider/selectors";
import { inventoriesToUpdateSelector } from "../../../store/inventory/selectors";

import * as purchasesSlice from "../../../store/purchases";

import Select from "../../generics/select";
import ProviderInput from "../../providers/providerInput";
import AddInventory from "./addInventory";
import InventoryInput from "../../inventory/inventoryInput";
import PurchaseContent from "./purchaseContent";

const Purchase = () => {
  const { purchaseId } = useParams();
  const dispatch = useDispatch();
  const providerList = useSelector(providersSelector);
  const purchase = useSelector(purchaseSelector);
  const inventories = useSelector(inventoriesToUpdateSelector);

  const [providerId, setProviderId] = useState(null);

  useEffect(() => {
    if (purchaseId !== "new") {
      dispatch(
        purchasesSlice.actions.setPurchase({
          purchase: purchaseId,
        })
      );
    }
  }, [purchaseId]);

  return (
    <>
      <div className="flex w-full justify-around">
        <div className="w-8/12">
          <Select
            label="Provider"
            renderOptions={providerList.map((provider, index) => (
              <option key={index} value={provider.id}>
                {provider.providerName}
              </option>
            ))}
            onChange={(e) => {
              setProviderId(e.target.value);
            }}
          />
        </div>
        <div className="w-3-12">
          <ProviderInput />
        </div>
      </div>
      {providerId && (
        <div className="flex w-full justify-around">
          <AddInventory providerId={providerId} />
          <InventoryInput />
        </div>
      )}

      <div className="w-full pt-5">
        <PurchaseContent inventories={inventories} />
      </div>
    </>
  );
};

export default Purchase;

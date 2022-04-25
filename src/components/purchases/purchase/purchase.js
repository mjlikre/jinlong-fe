import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { purchaseSelector } from "../../../store/purchases/selectors";
import { providersSelector } from "../../../store/provider/selectors";
import { inventoriesSelector } from "../../../store/inventory/selectors";

import * as purchasesSlice from "../../../store/purchases";

import Select from "../../generics/select";
import ProviderInput from "../../providers/providerInput";
import InventoryTable from "../../inventory/inventoryTable";
import AddInventory from "./addInventory";
import InventoryInput from "../../inventory/inventoryInput";
import PurchaseContent from "./purchaseContent";

const Purchase = () => {
  const { purchaseId } = useParams();
  const dispatch = useDispatch();
  const providerList = useSelector(providersSelector);
  const purchase = useSelector(purchaseSelector);

  const [providerId, setProviderId] = useState("");

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
      <div className="flex w-full justify-around">
        <AddInventory />
        <InventoryInput />
      </div>
      <div className="w-full pt-5">
        <PurchaseContent />
      </div>
    </>
  );
};

export default Purchase;

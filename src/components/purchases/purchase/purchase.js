import React, { useEffect, useState } from "react";

import * as R from "ramda";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { purchaseEdit } from "../../../store/purchases/selectors";
import { providersSelector } from "../../../store/provider/selectors";

import * as purchasesSlice from "../../../store/purchases";

import Select from "../../generics/select";
import ProviderInput from "../../providers/providerInput";
import AddInventory from "./addInventory";
import InventoryInput from "../../inventory/inventoryInput";
import PurchaseContent from "./purchaseContent";
import Button from "../../generics/buttons";
import Input from "../../generics/input";

const Purchase = () => {
  const { purchaseId } = useParams();
  const dispatch = useDispatch();
  const providerList = useSelector(providersSelector);
  const purchase = useSelector(purchaseEdit);

  useEffect(() => {
    if (purchaseId !== "new") {
      dispatch(purchasesSlice.thunks.setPurchase(purchaseId));
    } else {
      dispatch(purchasesSlice.actions.setPurchaseEdit({ purchaseState: true }));
    }
  }, [purchaseId]);

  const setProviderId = (providerId) => {
    dispatch(purchasesSlice.actions.setPurchaseEditProviderId({ providerId }));
  };

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
      {purchase.providerId && (
        <div className="flex w-full justify-around">
          <AddInventory providerId={purchase.providerId} />
          <InventoryInput />
        </div>
      )}

      <div className="w-full pt-5">
        <p className="font-light">Items purchased</p>

        <PurchaseContent inventories={purchase.itemsPurchased} />
      </div>
      <div className="w-full pt-5 flex justify-around">
        <div className="w-8/12">
          <Input
            label="Total Amount: "
            value={purchase.amount}
            type="number"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
        <div className="w-3-12">
          <Button text="Submit" />
        </div>
      </div>
    </>
  );
};

export default Purchase;

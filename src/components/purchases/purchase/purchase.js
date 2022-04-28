import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const providerList = useSelector(providersSelector);
  const purchase = useSelector(purchaseEdit);
  const [amount, setAmount] = useState(0);

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

  useEffect(() => {
    setAmount(purchase.amount);
  }, [purchase]);

  useEffect(() => {
    return () => {
      dispatch(purchasesSlice.thunks.cancelPurchase());
    };
  }, []);

  const onSubmit = () => {
    const finalPurchase = {
      amount,
      itemsPurchased: purchase.itemsPurchased,
      providerId: purchase.providerId,
    };
    console.log(finalPurchase);
  };

  const onCancel = () => {
    dispatch(purchasesSlice.thunks.cancelPurchase());
    navigate("/purchases");
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
          <InventoryInput fromPurchase providerId={purchase.providerId} />
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
            value={amount}
            type="number"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="w-3-12">
          <Button type="cancel" text="Cancel" onClick={onCancel} />
          <Button type="normal" text="Submit" onClick={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default Purchase;

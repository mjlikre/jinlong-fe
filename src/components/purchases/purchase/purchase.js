import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { purchaseEdit } from "../../../store/purchases/selectors";
import { providersSelector } from "../../../store/provider/selectors";
import { fetchedSelector } from "../../../store/fetched/selectors";

import * as purchasesSlice from "../../../store/purchases";

import Select from "../../generics/select";
import ProviderInput from "../../providers/providerInput";
import AddInventory from "./addInventory";
import InventoryInput from "../../inventory/inventoryInput";
import PurchaseContent from "./purchaseContent";
import Button from "../../generics/buttons";
import Input from "../../generics/input";
import DisabledInput from "../../generics/input/disabled";
import { generic, purchase as purchaseLang } from "../../../lib/language";
import { userDisplayLanguageSelector } from "../../../store/users/selectors";

const Purchase = () => {
  const lang = useSelector(userDisplayLanguageSelector);
  const { purchaseId, index = -1 } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const providerList = useSelector(providersSelector);
  const purchase = useSelector(purchaseEdit);
  const fetched = useSelector(fetchedSelector);
  const [viewOnly, setViewOnly] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (purchaseId !== "new") {
      fetched &&
        dispatch(
          purchasesSlice.thunks.setPurchase(index, () => setViewOnly(true))
        );
    } else {
      dispatch(purchasesSlice.actions.setPurchaseEdit({ purchaseState: true }));
    }
  }, [purchaseId, fetched]);

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
    dispatch(purchasesSlice.thunks.createPurchase(finalPurchase));
    navigate("/purchases");
  };

  const onCancel = () => {
    dispatch(purchasesSlice.thunks.cancelPurchase());
    navigate("/purchases");
  };

  const onDelete = () => {
    dispatch(purchasesSlice.thunks.deletePurchase(purchaseId, index));
    navigate("/purchases");
  };

  return (
    <>
      <div className="flex w-full justify-around pt-10">
        <div className="w-8/12">
          <p className="font-light">{purchaseLang.items[lang]}</p>
          <PurchaseContent
            inventories={purchase.itemsPurchased}
            viewOnly={viewOnly}
            lang={lang}
          />
        </div>
        <div className="w-3/12 bg-sky-50 p-5 rounded-lg">
          {viewOnly ? (
            <div className="flex flex-col justify-end">
              <DisabledInput
                label={generic.provider[lang]}
                value={purchase.provider.providerName}
              />
              <DisabledInput label={generic.totalAmount[lang]} value={amount} />
              <Button
                type="cancel"
                text={generic.delete[lang]}
                onClick={onDelete}
              />
            </div>
          ) : (
            <>
              <Select
                label={generic.provider[lang]}
                renderOptions={providerList.map((provider, index) => (
                  <option key={index} value={provider.id}>
                    {provider.providerName}
                  </option>
                ))}
                onChange={(e) => {
                  setProviderId(e.target.value);
                }}
              />

              {purchase.providerId ? (
                <div className="pb-4 flex justify-end space-x-4">
                  <AddInventory providerId={purchase.providerId} lang={lang} />
                  <InventoryInput
                    fromPurchase
                    providerId={purchase.providerId}
                    lang={lang}
                  />
                </div>
              ) : (
                <div className="pb-4 flex justify-end space-x-4">
                  <ProviderInput lang={lang} />
                </div>
              )}
              <Input
                label={`${generic.totalAmount[lang]}: `}
                value={amount}
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <div className="flex justify-end space-x-4">
                <Button
                  type="cancel"
                  text={generic.cancel[lang]}
                  onClick={onCancel}
                />
                <Button
                  type="normal"
                  text={generic.submit[lang]}
                  onClick={onSubmit}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Purchase;

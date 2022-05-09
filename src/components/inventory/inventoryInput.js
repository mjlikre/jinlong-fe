import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as inventorySlice from "../../store/inventory";

import { providersSelector } from "../../store/provider/selectors";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Select from "../generics/select";
import Modal from "../generics/modal";

import { generic, inventory } from "../../lib/language";

const InventoryInput = ({ providerId, fromPurchase, lang }) => {
  const providerList = useSelector(providersSelector) || [];
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [priceBought, setPriceBought] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [priceToSell, setPriceToSell] = useState(0);
  const [provider, setProvider] = useState("");

  useEffect(() => {
    if (fromPurchase) {
      setProvider(providerId);
    }
  }, [providerId, fromPurchase]);

  const postSubmission = (e) => {
    if (!e) {
      setName("");
      setPriceBought("");
      setPriceToSell("");
      setQuantity("");
      setProvider("");
      setIsOpen(false);
    }
  };

  const onSubmit = () => () => {
    const inventory = {
      productName: name,
      priceBought,
      priceToSell,
      quantity,
      providerId: provider,
    };
    dispatch(
      inventorySlice.thunks.createInventory(
        inventory,
        fromPurchase,
        postSubmission
      )
    );
  };

  return (
    <>
      <Button
        type="normal"
        text={inventory.add[lang]}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(!isOpen);
        }}
        title={inventory.add[lang]}
      >
        <form className="w-full max-w-sm">
          <Input
            label={generic.name[lang]}
            value={name}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            label={generic.priceBought[lang]}
            value={priceBought}
            type="number"
            onChange={(e) => {
              setPriceBought(e.target.value);
            }}
          />
          <Input
            label={generic.quantity[lang]}
            value={quantity}
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <Input
            label={generic.priceToSell[lang]}
            value={priceToSell}
            type="number"
            onChange={(e) => {
              setPriceToSell(e.target.value);
            }}
          />
          {!providerId && !fromPurchase && (
            <Select
              label={generic.provider[lang]}
              renderOptions={providerList.map((provider, index) => (
                <option key={index} value={provider.id}>
                  {provider.providerName}
                </option>
              ))}
              onChange={(e) => {
                setProvider(e.target.value);
              }}
            />
          )}

          <div className="mt-4">
            <Button type="normal" text="Add" onClick={onSubmit()} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default InventoryInput;

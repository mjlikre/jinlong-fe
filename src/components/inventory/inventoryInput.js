import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as inventorySlice from "../../store/inventory";

import { providersSelector } from "../../store/provider/selectors";
import { inventoryUpdateSelector } from "../../store/inventory/selectors";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Select from "../generics/select";
import Modal from "../generics/modal";

const InventoryInput = () => {
  const providerList = useSelector(providersSelector) || [];
  const update = useSelector(inventoryUpdateSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(update);
  const [name, setName] = useState("");
  const [priceBought, setPriceBought] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [priceToSell, setPriceToSell] = useState(0);
  const [provider, setProvider] = useState("");

  useEffect(() => {
    setName(update.productName);
    setPriceBought(update.priceBought);
    setPriceToSell(update.priceToSell);
    setQuantity(update.quantity);
    setProvider(update.providerId);
  }, [update]);

  const onSubmit = () => () => {
    const inventory = {
      productName: name,
      priceBought,
      priceToSell,
      quantity,
      providerId: provider,
    };
    dispatch(inventorySlice.thunks.createInventory({ inventory }));
  };

  return (
    <>
      <Button
        text="Add Inventory"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(!isOpen);
        }}
        title="Add Inventory"
      >
        <form className="w-full max-w-sm">
          <Input
            label="Inventory Name"
            value={name}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            label="Price Bought"
            value={priceBought}
            type="number"
            onChange={(e) => {
              setPriceBought(e.target.value);
            }}
          />
          <Input
            label="Quantity"
            value={quantity}
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <Input
            label="Price To Sell"
            value={priceToSell}
            type="number"
            onChange={(e) => {
              setPriceToSell(e.target.value);
            }}
          />
          <Select
            label="Provider"
            renderOptions={providerList.map((provider, index) => (
              <option key={index}>{provider.providerName}</option>
            ))}
            onChange={(e) => {
              setProvider(e.target.value);
            }}
          />
          <div className="mt-4">
            <Button text="Add" onClick={onSubmit} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default InventoryInput;

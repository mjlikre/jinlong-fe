import React, { useState } from "react";
import { useSelector } from "react-redux";

import { providersSelector } from "../../store/provider/selectors";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Select from "../generics/select";

const InventoryInput = () => {
  const [name, setName] = useState("");
  const [priceBought, setPriceBought] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [priceToSell, setPriceToSell] = useState(0);
  const [provider, setProvicer] = useState("");
  const providerList = useSelector(providersSelector) || [];

  return (
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
          setProvicer(e.target.value);
        }}
      />
      <div className="mt-4">
        <Button text="Add" onClick={() => console.log(provider)} />
      </div>
    </form>
  );
};

export default InventoryInput;

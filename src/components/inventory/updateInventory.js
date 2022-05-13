import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as inventorySlice from "../../store/inventory";

import { inventoryUpdateSelector } from "../../store/inventory/selectors";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Modal from "../generics/modal";

import { generic, inventory } from "../../lib/language";

const UpdateInventory = ({ lang }) => {
  const update = useSelector(inventoryUpdateSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [priceBought, setPriceBought] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [priceToSell, setPriceToSell] = useState(0);

  useEffect(() => {
    if (update) {
      setName(update.productName);
      setPriceBought(update.priceBought);
      setPriceToSell(update.priceToSell);
      setQuantity(update.quantity);
      setIsOpen(true);
    }
  }, [update]);

  const postSubmission = (e) => {
    if (!e) {
      onclose();
    }
  };

  const onclose = () => {
    setIsOpen(false);
    dispatch(inventorySlice.actions.setUpdate({ provider: false }));
  };

  const onSubmit = () => () => {
    const inventory = {
      productName: name,
      priceBought,
      priceToSell,
      quantity,
    };
    dispatch(
      inventorySlice.thunks.updateInventory(
        { inventoryId: update.id, update: inventory, index: update.index },
        postSubmission
      )
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={onclose} title={inventory.add[lang]}>
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
          <div className="mt-4">
            <Button type="normal" text="Update" onClick={onSubmit()} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateInventory;

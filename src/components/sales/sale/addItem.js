import React, { useEffect, useState } from "react";
import * as R from "ramda";

import { useDispatch, useSelector } from "react-redux";

import * as salesSlice from "../../../store/sales";

import { updateSaleItemSelector } from "../../../store/sales/selectors";
import { inventoriesSelector } from "../../../store/inventory/selectors";

import Input from "../../generics/input";
import DisabledInput from "../../generics/input/disabled";
import Button from "../../generics/buttons";
import Select from "../../generics/select";
import Modal from "../../generics/modal";
import { generic, inventory } from "../../../lib/language";

const AddInventory = ({ lang }) => {
  const inventories = useSelector(inventoriesSelector);
  const update = useSelector(updateSaleItemSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [priceToSell, setPriceToSell] = useState(0);
  const [inventoryIndex, setInventoryIndex] = useState("");

  useEffect(() => {
    if (update) {
      setIsOpen(true);
      setInventoryIndex(update.index);
      setQuantity(R.propOr(0, "quantity", update.update));
      setPriceToSell(R.propOr(0, "priceToSell", update.update));
      setProductName(R.propOr("", "productName", update.update));
    }
  }, [update]);

  const callback = (e) => {
    if (!e) {
      onclose();
    }
  };

  const onclose = () => {
    setIsOpen(false);
    setPriceToSell("");
    setQuantity(0);
    setInventoryIndex("");
    dispatch(salesSlice.actions.setUpdate({ inventory: false }));
  };

  const onUpdate = () => {
    const inventory = {
      priceToSell,
      productName,
      quantity: parseInt(quantity),
      prevQuantity: update.update.prevQuantity,
    };

    dispatch(
      salesSlice.thunks.updateAddedItem(
        {
          inventoryId: update.inventoryId,
          update: inventory,
          index: update.index,
        },
        update.itemIndex,
        callback
      )
    );
  };

  const onSubmit = () => {
    const inventory = {
      priceToSell,
      productName,
      quantity: parseInt(quantity),
      prevQuantity: R.propOr(0, "quantity", inventories[inventoryIndex]),
    };
    dispatch(
      salesSlice.thunks.itemsToUpdate(
        {
          inventoryId: R.propOr("", "id", inventories[inventoryIndex]),
          update: inventory,
          index: inventoryIndex,
        },
        callback
      )
    );
  };

  const setInventory = (id) => {
    const productIndex = R.findIndex(R.propEq("id", id), inventories);
    setInventoryIndex(productIndex);
    setPriceToSell(R.propOr(0, "priceToSell", inventories[productIndex]));
    setProductName(R.propOr(0, "productName", inventories[productIndex]));
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
      <Modal isOpen={isOpen} setIsOpen={onclose} title="Add Inventory">
        <form className="w-full max-w-sm">
          {!update ? (
            <Select
              label={generic.inventory[lang]}
              renderOptions={inventories.map((inventory, index) => (
                <option key={index} value={inventory.id}>
                  {inventory.productName}
                </option>
              ))}
              onChange={(e) => {
                setInventory(e.target.value);
              }}
            />
          ) : (
            <DisabledInput
              label={generic.productName[lang]}
              value={update.update.productName}
              type="number"
            />
          )}

          <DisabledInput
            label={generic.price[lang]}
            value={priceToSell}
            type="number"
          />
          <Input
            label={generic.quantity[lang]}
            value={quantity}
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />

          <div className="mt-4">
            {!update ? (
              <Button
                type="normal"
                text={generic.add[lang]}
                onClick={onSubmit}
              />
            ) : (
              <Button
                type="normal"
                text={generic.update[lang]}
                onClick={onUpdate}
              />
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddInventory;

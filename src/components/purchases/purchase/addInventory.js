import React, { useEffect, useState, useMemo } from "react";
import * as R from "ramda";

import { useDispatch, useSelector } from "react-redux";

import * as purchasesSlice from "../../../store/purchases";

import { purchaseItemUpdateSelector } from "../../../store/purchases/selectors";
import { inventoriesSelector } from "../../../store/inventory/selectors";

import Input from "../../generics/input";
import Button from "../../generics/buttons";
import Select from "../../generics/select";
import Modal from "../../generics/modal";
import { generic, inventory } from "../../../lib/language";

const AddInventory = ({ providerId, lang }) => {
  const inventories = useSelector(inventoriesSelector);
  const update = useSelector(purchaseItemUpdateSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [priceBought, setPriceBought] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [priceToSell, setPriceToSell] = useState(0);
  const [inventoryIndex, setInventoryIndex] = useState("");

  const inventoriesList = useMemo(
    () => R.filter(R.propEq("providerId", providerId), inventories),
    [providerId, inventories]
  );

  useEffect(() => {
    if (update) {
      setIsOpen(true);
      setInventoryIndex(update.index);
      setPriceBought(R.propOr(0, "priceBought", update.update));
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
    setPriceBought("");
    setPriceToSell("");
    setQuantity(0);
    setInventoryIndex("");
    dispatch(purchasesSlice.actions.setUpdate({ inventory: false }));
  };

  const onUpdate = () => {
    const inventory = {
      priceBought,
      priceToSell,
      productName,
      quantity: parseInt(quantity),
      prevQuantity: update.update.prevQuantity,
    };

    dispatch(
      purchasesSlice.thunks.updateAddedInventory(
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
      priceBought,
      priceToSell,
      productName,
      quantity: parseInt(quantity),
      prevQuantity: R.propOr(0, "quantity", inventories[inventoryIndex]),
      prevPriceBought: R.propOr(0, "priceBought", inventories[inventoryIndex]),
      prevPriceToSell: R.propOr(0, "priceToSell", inventories[inventoryIndex]),
    };
    dispatch(
      purchasesSlice.thunks.inventoriesToUpdate(
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
    setPriceBought(R.propOr(0, "priceBought", inventories[productIndex]));
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
      <Modal isOpen={isOpen} setIsOpen={onclose} title={inventory.add[lang]}>
        <form className="w-full max-w-sm">
          {!update ? (
            <Select
              label={generic.inventory[lang]}
              renderOptions={inventoriesList.map((inventory, index) => (
                <option key={index} value={inventory.id}>
                  {inventory.productName}
                </option>
              ))}
              onChange={(e) => {
                setInventory(e.target.value);
              }}
            />
          ) : (
            <div className="flex justify-center p-5">
              <div className="w-1/2 h-10 grid justify-items-center border-double border-4 border-sky-500 rounded">
                <span className="self-center decoration-4">
                  {update.update.productName}
                </span>
              </div>
            </div>
          )}

          <Input
            label={generic.priceBought[lang]}
            value={priceBought}
            type="number"
            onChange={(e) => {
              setPriceBought(e.target.value);
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import * as inventorySlice from "../../../store/inventory";

import { providersSelector } from "../../../store/provider/selectors";
import { inventoryUpdateSelector } from "../../../store/inventory/selectors";
import { inventoriesSelector } from "../../../store/inventory/selectors";

import Input from "../../generics/input";
import Button from "../../generics/buttons";
import Select from "../../generics/select";
import Modal from "../../generics/modal";

const AddInventory = () => {
  const inventoriesList = useSelector(inventoriesSelector) || [];
  const update = useSelector(inventoryUpdateSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [priceBought, setPriceBought] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [priceToSell, setPriceToSell] = useState(0);
  const [inventoryIndex, setInventoryIndex] = useState("");

  useEffect(() => {
    if (update) {
      setIsOpen(true);
      setInventoryIndex(update.index);
      setPriceBought(R.propOr(0, "priceBought", update.update));
      setPriceToSell(R.propOr(0, "priceToSell", update.update));
      setProductName(R.propOr(0, "productName", update.update));
    }
  }, [update]);

  const postSubmission = (e) => {
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
    dispatch(inventorySlice.actions.setUpdate({ inventory: false }));
  };

  const onSubmit = () => () => {
    const inventory = {
      priceBought,
      priceToSell,
      productName,
      quantity:
        parseInt(quantity) +
        R.propOr(0, "quantity", inventoriesList[inventoryIndex]),
      currentQuant: quantity,
    };
    dispatch(
      inventorySlice.actions.inventoriesToUpdate({
        inventory: {
          inventoryId: R.propOr("", "id", inventoriesList[inventoryIndex]),
          update: inventory,
          index: inventoryIndex,
        },
        callback: postSubmission,
      })
    );
  };

  const setInventory = (id) => {
    const productIndex = R.findIndex(R.propEq("id", id), inventoriesList);
    setInventoryIndex(productIndex);
    setPriceBought(R.propOr(0, "priceBought", inventoriesList[productIndex]));
    setPriceToSell(R.propOr(0, "priceToSell", inventoriesList[productIndex]));
    setProductName(R.propOr(0, "productName", inventoriesList[productIndex]));
  };

  return (
    <>
      <Button
        text="Add Inventory"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal isOpen={isOpen} setIsOpen={onclose} title="Add Inventory">
        <form className="w-full max-w-sm">
          {!update ? (
            <Select
              label="Inventory"
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
            label="Price Bought"
            value={priceBought}
            type="number"
            onChange={(e) => {
              setPriceBought(e.target.value);
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
          <Input
            label="Quantity"
            value={quantity}
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />

          <div className="mt-4">
            <Button text="Add" onClick={onSubmit()} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddInventory;

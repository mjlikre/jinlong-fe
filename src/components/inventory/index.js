import React, { useState } from "react";
import Button from "../generics/buttons";
import Modal from "../generics/modal";
import BaseLayout from "../layouts/baseLayouts";
import InventoryInput from "./inventoryInput";
const Inventory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BaseLayout>
      <div className="w-4/6 m-auto">
        <Button
          text="Add Inventory"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>

      <Modal
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(!isOpen);
        }}
        title="Add Inventory"
      >
        <InventoryInput />
      </Modal>
    </BaseLayout>
  );
};

export default Inventory;

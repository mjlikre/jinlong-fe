import React from "react";

import BaseLayout from "../layouts/baseLayouts";
import InventoryInput from "./inventoryInput";
import InventoryTable from "./inventoryTable";
import UpdateInventory from "./updateInventory";

const Inventory = () => {
  return (
    <BaseLayout>
      <div className="w-4/6 m-auto">
        <InventoryInput />
        <div className="w-full pt-10">
          <InventoryTable />
        </div>
      </div>
      <UpdateInventory />
    </BaseLayout>
  );
};

export default Inventory;

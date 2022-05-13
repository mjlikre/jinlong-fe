import React from "react";
import { useSelector } from "react-redux";
import { userDisplayLanguageSelector } from "../../store/users/selectors";

import BaseLayout from "../layouts/baseLayouts";
import InventoryInput from "./inventoryInput";
import InventoryTable from "./inventoryTable";
import UpdateInventory from "./updateInventory";

import { generic } from "../../lib/language";

const Inventory = () => {
  const language = useSelector(userDisplayLanguageSelector);
  return (
    <BaseLayout>
      <div className="w-full m-auto">
        <div className="text-2xl">{generic.inventoryPage[language]}</div>
        <div className="w-full flex pt-10">
          <div className="w-8/12">
            <InventoryTable lang={language} />
          </div>
          <div className="w-3/12 inline-flex justify-center items-start">
            <InventoryInput lang={language} />
          </div>
        </div>
      </div>
      <UpdateInventory lang={language} />
    </BaseLayout>
  );
};

export default Inventory;

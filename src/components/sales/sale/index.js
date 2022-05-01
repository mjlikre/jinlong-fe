// import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";

// import { purchaseEdit } from "../../../store/purchases/selectors";
// import { clientsSelector } from "../../../store/client/selectors";
// import { fetchedSelector } from "../../../store/fetched/selectors";

// import * as purchasesSlice from "../../../store/purchases";

// import * as salesSlice from "../../../store/sales";

// import Select from "../../generics/select";
// import ClientInput from "../../clients/clientInput";
// import AddInventory from "./addItem";
// import InventoryInput from "../../inventory/inventoryInput";
// import PurchaseContent from "./salesContent";
// import Button from "../../generics/buttons";
// import Input from "../../generics/input";
// import DisabledInput from "../../generics/input/disabled";

// const Purchase = () => {
//   const { saleId, index = -1 } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const clientList = useSelector(clientsSelector);
//   const purchase = useSelector(purchaseEdit);
//   const fetched = useSelector(fetchedSelector);
//   const [viewOnly, setViewOnly] = useState(false);
//   const [amount, setAmount] = useState(0);

//   useEffect(() => {
//     if (saleId !== "new") {
//       fetched &&
//         dispatch(
//           purchasesSlice.thunks.setPurchase(saleId, () => setViewOnly(true))
//         );
//     } else {
//       dispatch(purchasesSlice.actions.setPurchaseEdit({ purchaseState: true }));
//     }
//   }, [saleId, fetched]);

//   const setClientId = (providerId) => {
//     dispatch(purchasesSlice.actions.setPurchaseEditProviderId({ providerId }));
//   };

//   useEffect(() => {
//     setAmount(purchase.amount);
//   }, [purchase]);

//   useEffect(() => {
//     return () => {
//       dispatch(purchasesSlice.thunks.cancelPurchase());
//     };
//   }, []);

//   const onSubmit = () => {
//     const finalPurchase = {
//       amount,
//       itemsPurchased: purchase.itemsPurchased,
//       providerId: purchase.providerId,
//     };
//     dispatch(purchasesSlice.thunks.createPurchase(finalPurchase));
//     navigate("/purchases");
//   };

//   const onCancel = () => {
//     dispatch(purchasesSlice.thunks.cancelPurchase());
//     navigate("/purchases");
//   };

//   const onDelete = () => {
//     dispatch(purchasesSlice.thunks.deletePurchase(saleId, index));
//     navigate("/purchases");
//   };

//   return (
//     <>
//       <div className="flex w-full justify-around">
//         <div className="w-8/12">
//           {viewOnly ? (
//             <DisabledInput
//               label="Provider"
//               value={purchase.provider.providerName}
//             />
//           ) : (
//             <Select
//               label="Clients"
//               renderOptions={clientList.map((provider, index) => (
//                 <option key={index} value={provider.id}>
//                   {provider.providerName}
//                 </option>
//               ))}
//               onChange={(e) => {
//                 setProviderId(e.target.value);
//               }}
//             />
//           )}
//         </div>
//         {!viewOnly && (
//           <div className="w-3-12">
//             <ClientInput />
//           </div>
//         )}
//       </div>
//       {purchase.providerId && !viewOnly && (
//         <div className="flex w-full justify-around">
//           <AddInventory providerId={purchase.providerId} />
//           <InventoryInput fromPurchase providerId={purchase.providerId} />
//         </div>
//       )}

//       <div className="w-full pt-5">
//         <p className="font-light">Items purchased</p>

//         <PurchaseContent
//           inventories={purchase.itemsPurchased}
//           viewOnly={viewOnly}
//         />
//       </div>
//       <div className="w-full pt-5 flex justify-around">
//         <div className="w-8/12">
//           {viewOnly ? (
//             <DisabledInput label="Total Amount" value={amount} />
//           ) : (
//             <Input
//               label="Total Amount: "
//               value={amount}
//               type="number"
//               onChange={(e) => {
//                 setAmount(e.target.value);
//               }}
//             />
//           )}
//         </div>
//         <div className="w-3-12">
//           {viewOnly ? (
//             <Button type="cancel" text="Delete" onClick={onDelete} />
//           ) : (
//             <>
//               <Button type="cancel" text="Cancel" onClick={onCancel} />
//               <Button type="normal" text="Submit" onClick={onSubmit} />
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Purchase;
import React from "react";

const Sale = () => {
  return <div>index</div>;
};

export default Sale;

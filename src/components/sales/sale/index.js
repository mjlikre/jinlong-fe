import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { saleEditSelector } from "../../../store/sales/selectors";
import { clientsSelector } from "../../../store/client/selectors";
import { fetchedSelector } from "../../../store/fetched/selectors";

import * as salesSlice from "../../../store/sales";

import Select from "../../generics/select";
import ClientInput from "../../clients/clientInput";
import AddItem from "./addItem";
import SaleContent from "./salesContent";
import Button from "../../generics/buttons";
import Input from "../../generics/input";
import DisabledInput from "../../generics/input/disabled";

const Sale = () => {
  const { saleId, index = -1 } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientList = useSelector(clientsSelector);
  const sale = useSelector(saleEditSelector);
  const fetched = useSelector(fetchedSelector);
  const [viewOnly, setViewOnly] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (saleId !== "new") {
      fetched &&
        dispatch(salesSlice.thunks.setSale(saleId, () => setViewOnly(true)));
    } else {
      dispatch(salesSlice.actions.setSaleEdit({ saleState: true }));
    }
  }, [saleId, fetched]);

  const setClientId = (id) => {
    const clientId = id !== "false" ? id : null;
    dispatch(salesSlice.actions.setSaleClientId({ clientId }));
  };

  useEffect(() => {
    setAmount(sale.amount);
  }, [sale]);

  useEffect(() => {
    return () => {
      dispatch(salesSlice.thunks.cancelSale());
    };
  }, []);

  const onSubmit = () => {
    const finalSale = {
      amount,
      itemList: sale.itemList,
      clientId: sale.clientId,
    };
    dispatch(salesSlice.thunks.createSale(finalSale));
    navigate("/sales");
  };

  const onCancel = () => {
    dispatch(salesSlice.thunks.cancelSale());
    navigate("/sales");
  };

  const onDelete = () => {
    dispatch(salesSlice.thunks.deleteSale(saleId, index));
    navigate("/sales");
  };

  return (
    <>
      <div className="flex w-full justify-around">
        <div className="w-8/12">
          {viewOnly ? (
            <DisabledInput
              label="Client"
              value={`${sale.client.firstName} ${sale.client.lastName}`}
            />
          ) : (
            <Select
              label="Clients"
              renderOptions={clientList.map((client, index) => (
                <option key={index} value={client.id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
              onChange={(e) => {
                setClientId(e.target.value);
              }}
            />
          )}
        </div>
        {!viewOnly && (
          <div className="w-3-12">
            <ClientInput />
          </div>
        )}
      </div>
      {sale.clientId && !viewOnly && (
        <div className="flex w-full justify-around">
          <AddItem clientId={sale.clientId} />
        </div>
      )}

      <div className="w-full pt-5">
        <p className="font-light">Items Sold</p>

        <SaleContent itemList={sale.itemList} viewOnly={viewOnly} />
      </div>
      <div className="w-full pt-5 flex justify-around">
        <div className="w-8/12">
          {viewOnly ? (
            <DisabledInput label="Total Amount" value={amount} />
          ) : (
            <Input
              label="Total Amount: "
              value={amount}
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          )}
        </div>
        <div className="w-3-12">
          {viewOnly ? (
            <Button type="cancel" text="Delete" onClick={onDelete} />
          ) : (
            <>
              <Button type="cancel" text="Cancel" onClick={onCancel} />
              <Button type="normal" text="Submit" onClick={onSubmit} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sale;

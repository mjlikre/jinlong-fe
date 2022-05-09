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
import { generic, sales as salesLang } from "../../../lib/language";
import { userDisplayLanguageSelector } from "../../../store/users/selectors";

const Sale = () => {
  const lang = useSelector(userDisplayLanguageSelector);
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
        dispatch(salesSlice.thunks.setSale(index, () => setViewOnly(true)));
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
      <div className="flex w-full justify-around pt-10">
        <div className="w-8/12">
          <p className="font-light text-xl">{salesLang.items[lang]}</p>

          <SaleContent
            itemList={sale.itemList}
            viewOnly={viewOnly}
            lang={lang}
          />
        </div>
        <div className="w-3/12 bg-sky-50 p-5 rounded-lg">
          {viewOnly ? (
            <div className="flex flex-col justify-end">
              <DisabledInput
                label={generic.client[lang]}
                value={`${sale.client.firstName} ${sale.client.lastName}`}
              />
              <DisabledInput label={generic.totalAmount[lang]} value={amount} />
              <Button
                type="cancel"
                text={generic.delete[lang]}
                onClick={onDelete}
              />
            </div>
          ) : (
            <>
              <Select
                label={generic.client[lang]}
                renderOptions={clientList.map((client, index) => (
                  <option key={index} value={client.id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
                onChange={(e) => {
                  setClientId(e.target.value);
                }}
              />
              <div className="pb-4 flex justify-end">
                {sale.clientId ? (
                  <AddItem clientId={sale.clientId} lang={lang} />
                ) : (
                  <ClientInput lang={lang} />
                )}
              </div>

              <Input
                label={`${generic.totalAmount[lang]}: `}
                value={amount}
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <div className="flex justify-end space-x-4">
                <Button
                  type="cancel"
                  text={generic.cancel[lang]}
                  onClick={onCancel}
                />
                <Button
                  type="normal"
                  text={generic.submit[lang]}
                  onClick={onSubmit}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sale;

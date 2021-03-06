import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as providerSlice from "../../store/provider";

import { updateProviderSelector } from "../../store/provider/selectors";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Modal from "../generics/modal";

import { generic, provider } from "../../lib/language";

const ProviderInput = ({ lang }) => {
  const update = useSelector(updateProviderSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(update);
  const [providerName, setProviderName] = useState("");
  const [contactFirstName, setConfactFirstName] = useState("");
  const [contactLastName, setConfactLastNamn] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const postSubmission = (e) => {
    if (!e) {
      setProviderName("");
      setConfactFirstName("");
      setConfactLastNamn("");
      setContactPhone("");
      setContactEmail("");
      setIsOpen(false);
    }
  };

  const onClose = () => {
    setProviderName("");
    setConfactFirstName("");
    setConfactLastNamn("");
    setContactPhone("");
    setContactEmail("");
    setIsOpen(false);
  };

  const onSubmit = () => () => {
    const provider = {
      providerName,
      contactFirstName,
      contactLastName,
      contactPhone,
      contactEmail,
    };
    dispatch(providerSlice.thunks.createProvider({ provider }, postSubmission));
  };

  return (
    <>
      <Button
        type="normal"
        text={generic.provider[lang]}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal isOpen={isOpen} setIsOpen={onClose} title={generic.provider[lang]}>
        <form className="w-full max-w-sm">
          <Input
            label={generic.provider[lang]}
            value={providerName}
            type="text"
            onChange={(e) => {
              setProviderName(e.target.value);
            }}
          />
          <Input
            label={provider.contact.fitstName[lang]}
            value={contactFirstName}
            type="text"
            onChange={(e) => {
              setConfactFirstName(e.target.value);
            }}
          />
          <Input
            label={provider.contact.lastName[lang]}
            value={contactLastName}
            type="text"
            onChange={(e) => {
              setConfactLastNamn(e.target.value);
            }}
          />
          <Input
            label={generic.phone[lang]}
            value={contactPhone}
            type="text"
            onChange={(e) => {
              setContactPhone(e.target.value);
            }}
          />
          <Input
            label={generic.email[lang]}
            value={contactEmail}
            type="text"
            onChange={(e) => {
              setContactEmail(e.target.value);
            }}
          />
          <div className="mt-4">
            <Button
              type="normal"
              text={generic.add[lang]}
              onClick={onSubmit()}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProviderInput;

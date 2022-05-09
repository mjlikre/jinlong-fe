import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as providerSlice from "../../store/provider";

import { updateProviderSelector } from "../../store/provider/selectors";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Modal from "../generics/modal";

import { generic, provider } from "../../lib/language";

const UpdateProvider = ({ lang }) => {
  const update = useSelector(updateProviderSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [providerName, setProviderName] = useState("");
  const [contactFirstName, setConfactFirstName] = useState("");
  const [contactLastName, setConfactLastNamn] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    if (update) {
      setProviderName(update.providerName);
      setConfactFirstName(update.contactFirstName);
      setConfactLastNamn(update.contactLastName);
      setContactPhone(update.contactPhone);
      setContactEmail(update.contactEmail);
      setIsOpen(true);
    }
  }, [update]);

  const postSubmission = (e) => {
    if (!e) {
      onclose();
    }
  };

  const onclose = () => {
    setIsOpen(false);
    dispatch(providerSlice.actions.setUpdate({ provider: false }));
  };

  const onSubmit = () => () => {
    const provider = {
      providerName,
      contactFirstName,
      contactLastName,
      contactPhone,
      contactEmail,
    };
    dispatch(
      providerSlice.thunks.updateProvider(
        { providerId: update.id, update: provider, index: update.index },
        postSubmission
      )
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={onclose} title="Add Provider">
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
              text={generic.update[lang]}
              onClick={onSubmit()}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateProvider;

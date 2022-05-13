import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as clientSlice from "../../store/client";

import { updateClientSelector } from "../../store/client/selectors";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Modal from "../generics/modal";

import { generic, client } from "../../lib/language";

const UpdateClient = ({ lang }) => {
  const update = useSelector(updateClientSelector);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (update) {
      setFirstName(update.firstName);
      setLastName(update.lastName);
      setEmail(update.email);
      setPhone(update.phone);
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
    dispatch(clientSlice.actions.setUpdate({ provider: false }));
  };

  const onSubmit = () => () => {
    const client = {
      firstName,
      lastName,
      email,
      phone,
    };
    dispatch(
      clientSlice.thunks.updateClient(
        { clientId: update.id, update: client, index: update.index },
        postSubmission
      )
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={onclose} title={client.add[lang]}>
        <form className="w-full max-w-sm">
          <Input
            label={generic.name[lang]}
            value={firstName}
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            label={generic.lastName[lang]}
            value={lastName}
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Input
            label={generic.phone[lang]}
            value={phone}
            type="text"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Input
            label={generic.email[lang]}
            value={email}
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
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

export default UpdateClient;

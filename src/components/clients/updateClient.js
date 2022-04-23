import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as clientSlice from "../../store/client";

import { updateClientSelector } from "../../store/client/selectors";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Modal from "../generics/modal";

const UpdateClient = () => {
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
      <Modal isOpen={isOpen} setIsOpen={onclose} title="Add Inventory">
        <form className="w-full max-w-sm">
          <Input
            label="Client name"
            value={firstName}
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Input
            label="Client lastname"
            value={lastName}
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Input
            label="Client phone"
            value={phone}
            type="text"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Input
            label="Client email"
            value={email}
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="mt-4">
            <Button text="Update" onClick={onSubmit()} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateClient;

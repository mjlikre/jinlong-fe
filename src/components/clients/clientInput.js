import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as clientSlice from "../../store/client";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Modal from "../generics/modal";

const ClientInput = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const postSubmission = (e) => {
    if (!e) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setIsOpen(false);
    }
  };

  const onSubmit = () => () => {
    const client = {
      firstName,
      lastName,
      email,
      phone,
    };
    dispatch(clientSlice.thunks.createClient(client, postSubmission));
  };

  return (
    <>
      <Button
        text="Add Client"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(!isOpen);
        }}
        title="Add Inventory"
      >
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
            <Button text="Add" onClick={onSubmit()} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ClientInput;

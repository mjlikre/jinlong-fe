import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as clientSlice from "../../store/client";

import Input from "../generics/input";
import Button from "../generics/buttons";
import Modal from "../generics/modal";

import { generic, client } from "../../lib/language";

const ClientInput = ({ lang }) => {
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
        text={client.add[lang]}
        onClick={() => {
          setIsOpen(true);
        }}
        type="normal"
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(!isOpen);
        }}
        title={client.add[lang]}
      >
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
              text={generic.add[lang]}
              onClick={onSubmit()}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ClientInput;

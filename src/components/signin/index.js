import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as userSlice from "../../store/users";

import Navbar from "../layouts/navbar";
import Button from "../generics/buttons";
import Input from "../generics/input";
import { generic } from "../../lib/language";

const SignIn = () => {
  const lang = localStorage.getItem("language");
  const auth = localStorage.getItem("token");
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticate = (e) => {
    !e && navigate("/");
  };

  const onSubmit = () => () => {
    dispatch(userSlice.thunks.signin({ userName, password }, authenticate));
  };

  useEffect(() => {
    auth && navigate("/");
  });

  return (
    <>
      <Navbar signin />
      <div className="flex items-center justify-center pt-36">
        <div className="w-96">
          <form
            className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4
            }`}
          >
            <p className="text-2xl">{generic.signIn[lang]}</p>
            <Input
              label={generic.username[lang]}
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder={generic.username[lang]}
            />

            <Input
              label={generic.password[lang]}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              placeholder="********"
            />

            <div className="flex items-center justify-between">
              <Button
                type="normal"
                onClick={onSubmit()}
                text={generic.signIn[lang]}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

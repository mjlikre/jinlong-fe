import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as userSlice from "../../store/users";

import Navbar from "../layouts/navbar/partialNavbar";
import Button from "../generics/buttons";
import Input from "../generics/input";

import { generic } from "../../lib/language";

const SignUp = () => {
  const lang = localStorage.getItem("language");
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorCheck = () => {
    if (!userName) return "Username field must not be empty";
    if (userName.length < 6)
      return "Username length must be more than 6 characters";
    if (!password) return "Password field must not be empty";
    if (password.length < 6)
      return "Password length must be more than 6 characters";
    return null;
  };

  const authenticate = (e) => {
    !e && navigate("/sales");
  };

  const onSubmit = () => () => {
    const error = errorCheck();
    setError(error);
    if (!error) {
      dispatch(userSlice.thunks.signup({ userName, password }, authenticate));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center pt-36">
        <div className="w-96">
          <form
            className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
              error ? "shadow-red-500" : null
            }`}
          >
            <p className="text-red-500 text-xs italic">{error}</p>
            <p className="text-2xl">{generic.signUp[lang]}</p>
            <Input
              label={generic.username[lang]}
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Username"
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
                text={generic.signUp[lang]}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

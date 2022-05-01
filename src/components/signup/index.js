import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as userSlice from "../../store/users";

import Navbar from "../layouts/navbar/partialNavbar";
import Button from "../generics/buttons";

const SignUp = () => {
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
    !e && navigate("/main");
  };

  const onSubmit = () => () => {
    const error = errorCheck();
    setError(error);
    console.log("hehe");
    if (!error) {
      dispatch(userSlice.thunks.signup({ userName, password }, authenticate));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center pt-36">
        <div className="w-full max-w-xs">
          <form
            className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
              error ? "shadow-red-500" : null
            }`}
          >
            <p className="text-red-500 text-xs italic">{error}</p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="*********"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <Button type="normal" onClick={onSubmit()} text="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

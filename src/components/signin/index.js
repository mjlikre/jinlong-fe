import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as userSlice from "../../store/users";

import Navbar from "../layouts/navbar/partialNavbar";
import Button from "../generics/buttons";

const SignIn = () => {
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticate = (e) => {
    !e && navigate("/main");
  };

  const onSubmit = () => () => {
    dispatch(userSlice.thunks.signin({ userName, password }, authenticate));
  };

  return (
    <>
      <Navbar signin />
      <div className="flex items-center justify-center pt-36">
        <div className="w-full max-w-xs">
          <form
            className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4
            }`}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
              <Button type="normal" onClick={onSubmit()} text="Sign In" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

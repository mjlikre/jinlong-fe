import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userSlice from "../../store/users";
import { userSelector } from "../../store/users/selectors";

import Navbar from "../layouts/navbar/partialNavbar";
import Button from "../layouts/buttons";

const SignUp = () => {
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const errorCheck = () => {
    if (!userName) return "Username field must not be empty";
    if (userName.length < 6)
      return "Username length must be more than 6 characters";
    if (!password) return "Password field must not be empty";
    if (password.length < 6)
      return "Password length must be more than 6 characters";
    return null;
  };

  const onSubmit = () => () => {
    const error = errorCheck();
    setError(error);

    if (!error) {
      dispatch(userSlice.thunks.signup({ userName, password }));
    }
  };

  const user = useSelector(userSelector);
  console.log(user);
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
              <Button onClick={onSubmit}>Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

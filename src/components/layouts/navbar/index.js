import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as usersSlice from "../../../store/users";

const Navbar = () => {
  const dispatch = useDispatch();
  const logout = () => () => {
    dispatch(usersSlice.thunks.signout());
  };
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 bg-slate-300">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                to="/main"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/sales"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              >
                Sales
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              >
                Inventory
              </Link>
            </li>
            <li>
              <Link
                to="/clients"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              >
                Clients
              </Link>
            </li>
            <li>
              <Link
                to="/providers"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              >
                Providers
              </Link>
            </li>
            <li>
              <Link
                to="/purchases"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              >
                Purchases
              </Link>
            </li>
            <li>
              <div onClick={logout()}>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  Sign Out
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

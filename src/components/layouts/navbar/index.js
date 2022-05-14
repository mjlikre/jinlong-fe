import React from "react";
import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as usersSlice from "../../../store/users";

import { buildString } from "../../../lib/utils";
import { generic } from "../../../lib/language";
import Dropdown from "../../generics/headless/menu";
import { userDisplayLanguageSelector } from "../../../store/users/selectors";

const Navbar = ({ signin }) => {
  const lang = useSelector(userDisplayLanguageSelector);
  const dispatch = useDispatch();
  const logout = () => () => {
    dispatch(usersSlice.thunks.signout());
  };

  const menuItems = [
    {
      lang: "English",
      action: () => updateUserDisplayLanguage("en"),
    },
    {
      lang: "Español",
      action: () => updateUserDisplayLanguage("sp"),
    },
    {
      lang: "中文",
      action: () => updateUserDisplayLanguage("ch"),
    },
  ];

  const updateUserDisplayLanguage = (lang) => {
    const update = {
      lang,
    };
    dispatch(usersSlice.thunks.updateUser(update));
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 bg-slate-300">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          {!signin && (
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link
                  to="/sales"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  {generic.sales[lang]}
                </Link>
              </li>
              <li>
                <Link
                  to="/inventory"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  {generic.inventory[lang]}
                </Link>
              </li>
              <li>
                <Link
                  to="/clients"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  {generic.client[lang]}
                </Link>
              </li>
              <li>
                <Link
                  to="/providers"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  {generic.provider[lang]}
                </Link>
              </li>
              <li>
                <Link
                  to="/purchases"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  {generic.purchases[lang]}
                </Link>
              </li>
              <li>
                <button
                  onClick={logout()}
                  className="inline-flex w-full justify-center rounded-md bg-inherit text-sm font-medium text-blue-700 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  {generic.signout[lang]}
                </button>
              </li>
              <li>
                <div
                  className={buildString({
                    [`text-blue-700 flex`]: true,
                  })}
                >
                  {R.cond([
                    [R.equals("en"), R.always("English")],
                    [R.equals("sp"), R.always("Español")],
                    [R.equals("ch"), R.always("中文")],
                  ])(lang)}
                  <Dropdown items={menuItems} />
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

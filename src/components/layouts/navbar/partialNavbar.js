import React from "react";
import { Link } from "react-router-dom";
import { generic } from "../../../lib/language";

const PartialNavbar = ({ signin }) => {
  const lang = localStorage.getItem("language");
  return (
    <nav className="bg-slate-300 border-blue-200 px-2 sm:px-4 py-2.5 border-b-4">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              {signin ? (
                <Link
                  to="/signup"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  {generic.signUp[lang]}
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  {generic.signIn[lang]}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PartialNavbar;

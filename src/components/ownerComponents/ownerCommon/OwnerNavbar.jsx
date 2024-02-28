import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ownerLogout } from "../../../reduxStore/slices/ownerSlice";
import { toast } from "react-toastify";

const OwnerNavbar = () => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ owner }= useSelector((state) => state.ownerReducer);

  const toggleDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("ownerToken");
    dispatch(ownerLogout());
    toast.success("Logout Successfully");
    navigate("/owner/login");
  };
  return (
    <nav className="bg-white border-gray-200 white:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="items-center justify-between hidden  md:flex md:w-full md:order-1 py-5">
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap white:text-dark">
            Bookbreeze
          </span> */}
          <>
            <img
              src="/images/logo3.jpg"
              alt="Logo"
              className="mr-4 w-16 rounded-full object-cover"
            />
            <span className="text-2xl font-semibold text-red-600 -ml-4 font-serif">
              Saty
              <span className="text-2xl font-semibold text-black">Mate</span>
            </span>
            <span className="text-xs font-serif text-red-600 mt-10 -ml-28">
              Your Stay ,
              <span className="text-black"> Our Way .</span>
            </span>
          </>

          <div className=" w-full m-auto  md:w-auto">
            <ul className="flex flex-col md:flex-row md:items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <li>
                <Link
                  to="/owner"
                  className={
                    location.pathname === "/owner"
                      ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                      : "block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-600 font-bold text-xl"
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/owner/dashboard"
                  className={
                    location.pathname ==="/owner/dashboard"
                      ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/owner/contact"
                  className={
                    location.pathname === "/owner/contact"
                      ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                  }
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/owner/about"
                  className={
                    location.pathname === "/owner/about"
                      ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                  }
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          {/* User Dropdown */}
          <div className="relative flex items-center">
            <button
              type="button"
              className="flex items-center justify-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>

              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>

            {/* Dropdown menu */}
            {isDropDownOpen && (
              <div
                className="absolute z-50 top-full right-0 mt-6 text-base  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-200 dark:divide-gray-100"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-text-balck dark:text-balck">
                    {owner.name}
                  </span>
                  <span className="block text-sm text-text-balck truncate dark:text-balck">
                    {owner.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/owner/profile"
                      className="block px-4 py-2 text-sm text-balck hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-balck dark:hover:text-black"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-balck hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-balck dark:hover:text-black"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavbar;

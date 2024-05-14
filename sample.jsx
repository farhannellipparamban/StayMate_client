import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../../../reduxStore/slices/userSlice";
import { toast } from "react-toastify";

const UserNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    console.log("hello");
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { user } = useSelector((state) => state.userReducer);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(userLogout());
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-gray-200 white:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            className="text-black hover:text-black focus:outline-none focus:text-black"
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

          {/* Mobile Menu Items */}
          {isMobileMenuOpen && (
            <div className="mt-2 md:hidden">
              <ul className="flex flex-col md:flex-row md:items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                <li>
                  <Link
                    to="/"
                    className={
                      location.pathname === "/"
                        ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                    }
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/allRooms"
                    className={
                      location.pathname === "/allRooms"
                        ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                    }
                  >
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={
                      location.pathname === "/contact"
                        ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                    }
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={
                      location.pathname === "/about"
                        ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                    }
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Desktop Menu */}
        <div className="items-center justify-between hidden  md:flex md:w-full md:order-1 py-5">
          <>
            <img
              src="/images/logo3.jpg"
              alt="Logo"
              className="mr-4 w-16 rounded-full object-cover"
            />
            <span className="text-2xl font-semibold text-red-600 -ml-4 font-serif">
              Stay
              <span className="text-2xl font-semibold text-black">Mate</span>
            </span>
            <span className="text-xs font-serif text-red-600 mt-10 -ml-28">
              Your Stay ,<span className="text-black"> Our Way .</span>
            </span>
          </>

          <div className=" w-full m-auto  md:w-auto">
            <ul className="flex flex-col md:flex-row md:items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <li>
                <Link
                  to="/"
                  className={
                    location.pathname === "/"
                      ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allRooms"
                  className={
                    location.pathname === "/allRooms"
                      ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                  }
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={
                    location.pathname === "/contact"
                      ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                  }
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={
                    location.pathname === "/about"
                      ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-blue-700text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                  }
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="relative flex items-center">
          <button
            type="button"
            className="flex items-center justify-center text-sm bg-black rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
          {isDropdownOpen &&
            (user ? (
              <div
                className="absolute  z-50 top-full right-0 mt-6 text-base  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-200 dark:divide-gray-100"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-text-balck dark:text-balck">
                    {user.name}
                  </span>
                  <span className="block text-sm text-text-balck truncate dark:text-balck">
                    {user.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-balck hover:bg-gray-400 dark:hover:bg-balck dark:text-balck dark:hover:text-balck"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bookingList"
                      className="block px-4 py-2 text-sm text-balck hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-balck dark:hover:text-black"
                    >
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-balck hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-balck dark:hover:text-black"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div
                className="absolute z-50 top-full right-0 mt-6 text-base bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-200 dark:divide-gray-100"
                id="user-dropdown"
              >
                <ul className="py-2 w-32" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      className="block px-4 py-2 text-sm text-balck hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-balck dark:hover:text-black"
                      to="/login"
                    >
                      User login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 text-sm text-balck hover:bg-gray-400 dark:hover:bg-gray-400 dark:text-balck dark:hover:text-black"
                      to="/owner/login"
                    >
                      Owner Login
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;

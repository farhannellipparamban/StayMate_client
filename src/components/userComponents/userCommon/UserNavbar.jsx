import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../../../reduxStore/slices/userSlice";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
        <div className="absolute top-0 left-0 right-0">
          <div className="md:hidden">
            <button
              className="text-black hover:text-black focus:outline-none focus:text-black ml-1 mt-2"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>

              <FontAwesomeIcon icon={faBars} size="2x" />
            </button>

            {/* Mobile Menu Items */}
            {isMobileMenuOpen && (
              <div className="mt-2 md:hidden bg-white  shadow-lg rounded-lg">
                {user ? (
                  <ul className="flex flex-col md:flex-row md:items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="px-4 py-3 bg-gray-100 dark:bg-gray-900 rounded-t-lg">
                      <span className="block text-sm text-gray-800 dark:text-gray-200">
                        {user.name}
                      </span>
                      <span className="block text-sm text-gray-600 dark:text-gray-400 truncate">
                        {user.email}
                      </span>
                      <hr className="border border-white my-3" />
                      <ul className="flex flex-col md:flex-row md:items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                        <li>
                          <Link
                            to="/profile"
                            className={
                              location.pathname === "/profile"
                                ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                                : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-red-600 md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                            }
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/bookingList"
                            className={
                              location.pathname === "/bookingList"
                                ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                                : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 text-red-600 md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                            }
                          >
                            My Bookings
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <>
                      <li>
                        <Link
                          to="/"
                          className={
                            location.pathname === "/"
                              ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                              : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
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
                              : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
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
                              : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
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
                              : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                          }
                        >
                          About
                        </Link>
                      </li>
                    </>
                    <li>
                      <Link
                        onClick={handleLogout}
                        className={
                          location.pathname === "/logout"
                            ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                            : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                        }
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="flex flex-col md:flex-row md:items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <>
                      <li>
                        <Link
                          to="/"
                          className={
                            location.pathname === "/"
                              ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                              : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
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
                              : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
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
                              : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
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
                              : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                          }
                        >
                          About
                        </Link>
                      </li>
                    </>
                    <li>
                      <Link
                        to="/login"
                        className={
                          location.pathname === "/login"
                            ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                            : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                        }
                      >
                        User Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/owner/login"
                        className={
                          location.pathname === "/owner/login"
                            ? "block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark-text-red-500"
                            : "block py-2 px-3 font-serif rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600  text-red-600  md:p-0 dark:text-dark md:dark:hover:text-red-600 text-blue-500text-red-600  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-xl"
                        }
                      >
                        Owner Login
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="items-center justify-between hidden  md:flex md:w-full md:order-1 py-5">
          <>
            {/* <img
              src="/images/logo3.jpg"
              alt="Logo"
              className="mr-4 w-16 rounded-full object-cover"
            /> */}
            <span className="text-2xl font-style: italic font-semibold text-red-600 -ml-4 font-serif">
              Stay
              <span className="text-2xl font-style: italic font-semibold text-black">
                Mate
              </span>
            </span>
            <span className="text-xs font-style: italic font-serif text-red-600 mt-10 -ml-32">
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
      </div>
    </nav>
  );
};

export default UserNavbar;

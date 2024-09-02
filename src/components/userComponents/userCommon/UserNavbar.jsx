import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../../../reduxStore/slices/userSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  BedDouble,
  Phone,
  Info,
} from "lucide-react";

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  const linkClass = (path) =>
    `flex items-center w-full py-3 px-4 text-lg font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "text-red-600 bg-gray-300"
        : "text-gray-800 hover:text-red-700 hover:bg-red-100"
    }`;

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/allRooms", label: "Rooms", icon: BedDouble },
    { path: "/contact", label: "Contact", icon: Phone },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="relative z-20 bg-white border-gray-200 white:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        {/* Mobile Menu */}
        <div className="absolute top-0 left-2.5 right-2.5">
          <div className="md:hidden">
            {" "}
            <button
              onClick={toggleMobileMenu}
              className="z-50 p-2 flex justify-between items-center w-full"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {!isMobileMenuOpen && <Menu size={30} />}{" "}
              {isMobileMenuOpen && (
                <X size={24} className="ml-auto fixed top-5 right-5 z-50" />
              )}{" "}
            </button>
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="fixed inset-y-0 left-0 w-full sm:w-80 bg-white shadow-2xl overflow-y-auto z-40"
                >
                  <div className="flex flex-col h-full">
                    <div className="p-5 bg-gray-50">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        <span className="text-red-600 font-style: italic font-serif">
                          Stay
                        </span>
                        <span className="text-black font-style: italic font-serif">
                          Mate
                        </span>
                      </h2>
                      <p className="text-sm font-style: italic font-serif text-gray-600">
                        Your Stay, Our Way.
                      </p>
                    </div>

                    {user && (
                      <div className="p-5 bg-gray-100 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <User size={24} className="text-gray-600" />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <nav className="flex-grow p-5">
                      <ul className="space-y-2">
                        {menuItems.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className={linkClass(item.path)}
                              onClick={toggleMobileMenu}
                            >
                              <item.icon size={20} className="mr-3" />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        {user ? (
                          <>
                            <li>
                              <Link
                                to="/profile"
                                className={linkClass("/profile")}
                                onClick={toggleMobileMenu}
                              >
                                <User size={20} className="mr-3" />
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/bookingList"
                                className={linkClass("/bookingList")}
                                onClick={toggleMobileMenu}
                              >
                                <BedDouble size={20} className="mr-3" />
                                My Bookings
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  handleLogout();
                                  toggleMobileMenu();
                                }}
                                className="flex items-center w-full py-3 px-4 text-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                              >
                                <LogOut size={20} className="mr-3" />
                                Logout
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link
                                to="/login"
                                className={linkClass("/login")}
                                onClick={toggleMobileMenu}
                              >
                                <User size={20} className="mr-3" />
                                User Login
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/owner/login"
                                className={linkClass("/owner/login")}
                                onClick={toggleMobileMenu}
                              >
                                <User size={20} className="mr-3" />
                                Owner Login
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </nav>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={toggleMobileMenu}
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="items-center justify-between hidden  md:flex md:w-full md:order-1 py-5">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              <span className="text-red-600 font-style: italic font-serif">
                Stay
              </span>
              <span className="text-black font-style: italic font-serif">
                Mate
              </span>
            </h2>
            <p className="text-sm font-style: italic font-serif text-gray-600 -mt-1">
              Your Stay, Our Way.
            </p>
          </div>

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

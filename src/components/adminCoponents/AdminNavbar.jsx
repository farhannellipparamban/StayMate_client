import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../reduxStore/slices/adminSlice";
import { toast } from "react-toastify";

const AdminNavbar = () => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  const { admin } = useSelector((state) => state.adminReducer);

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    dispatch(adminLogout());
    toast.success("Logout successfully");
    navigate("/admin");
  };

  return (
    <header className="px-4 py-2 shadow">
      <div className="flex justify-between items-center ">
        <div className="flex items-center px-4">
          <img className="h-12 w-auto max-w-full align-middle" src="" alt="" />
          <div className="flex ml-3 flex-col">
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
            <span className="text-xs font-serif text-red-600 -ml-3">
              Your Stay ,
              <span className="text-black"> Our Way .</span>
            </span>
          </>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <button
            data-messages
            className="p-3 mr-2 focus:outline-none hover:bg-gray-200 hover:rounded-md"
            type="button"
          >
            <svg className="fill-current w-5" viewBox="0 0 512 512">
              <path d="M339.392 258.624L512 367.744V144.896zM0 144.896v222.848l172.608-109.12zM480 80H32C16.032 80 3.36 91.904.96 107.232L256 275.264l255.04-168.032C508.64 91.904 495.968 80 480 80zM310.08 277.952l-45.28 29.824a15.983 15.983 0 01-8.8 2.624c-3.072 0-6.112-.864-8.8-2.624l-45.28-29.856L1.024 404.992C3.488 420.192 16.096 432 32 432h448c15.904 0 28.512-11.808 30.976-27.008L310.08 277.952z" />
            </svg>
          </button>
          <button
            data-notifications
            className="p-3 mr-3 focus:outline-none hover:bg-gray-200 hover:rounded-md"
            type="button"
          >
            <svg className="fill-current w-5" viewBox="-21 0 512 512">
              <path d="M213.344 512c38.636 0 70.957-27.543 78.379-64H134.965c7.426 36.457 39.746 64 78.379 64zm0 0M362.934 255.98c-.086 0-.172.02-.258.02-82.324 0-149.332-66.988-149.332-149.332 0-22.637 5.207-44.035 14.273-63.277-4.695-.446-9.453-.723-14.273-.723-82.473 0-149.332 66.855-149.332 149.332v59.477c0 42.218-18.496 82.07-50.946 109.503C2.25 370.22-2.55 384.937 1.332 399.297c4.523 16.703 21.035 27.371 38.36 27.371H386.89c18.175 0 35.308-11.777 38.996-29.59 2.86-13.781-2.047-27.543-12.735-36.523-31.02-26.004-48.96-64.215-50.218-104.575zm0 0" />
              <path
                style={{ fill: "red" }}
                d="M469.344 106.668c0 58.91-47.754 106.664-106.668 106.664-58.91 0-106.664-47.754-106.664-106.664C256.012 47.758 303.766 0 362.676 0c58.914 0 106.668 47.758 106.668 106.668zm0 0"
              />
            </svg>
          </button>
        </div>

        <div className="relative">
          <button
            data-dropdown
            className="flex items-center px-3 py-2 focus:outline-none hover:bg-gray-200 hover:rounded-md"
            type="button"
            onClick={toggleDropdown}
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-4 text-sm hidden md:inline-block">{admin}</span>
            <svg
              className="fill-current w-3 ml-4 hidden md:inline-block"
              viewBox="0 0 407.437 407.437"
            >
              {/* Your SVG for dropdown arrow */}
            </svg>
          </button>
          {/* Dropdown menu */}
          {isDropDownOpen && (
            <div className="absolute z-10 mt-2 w-full md:w-auto md:right-0 md:left-0">
              <div className="bg-white border border-gray-400 shadow rounded">
                <ul>
                  <li
                    className="px-4 py-3 hover:bg-gray-200 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;

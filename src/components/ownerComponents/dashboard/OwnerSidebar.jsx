import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHotel } from "@fortawesome/free-solid-svg-icons";

const OwnerSidebar = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-full sm:w-64  bg-white">
        <div className="h-screen pb-10">
          <div className="flex flex-col h-full overflow-y-auto rounded-br-lg rounded-tr-lg bg-white ">
            <div className="flex mt-6 flex-1 flex-col">
              <nav className="flex-1">
                <Link
                  to="/owner/dashboard"
                  className={
                    location.pathname === "/owner/dashboard"
                      ? "flex cursor-pointer items-center border-l-4 border-l-rose-600 py-5 px-5 text-sm font-medium text-rose-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
                      : "flex cursor-pointer items-center border-l-rose-600 py-5 px-5 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4"
                  }
                >
                  <svg
                    className="mr-4 h-5 w-5 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </Link>

                <Link
                  to="/owner/roomList"
                  className={
                    location.pathname === "/owner/roomList"
                      ? "flex cursor-pointer items-center border-l-4 border-l-rose-600 py-5 px-5 text-sm font-medium text-rose-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
                      : "flex cursor-pointer items-center border-l-rose-600 py-5 px-5 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4"
                  }
                >
                  <FontAwesomeIcon className="mr-4 h-5 w-5 align-middle" icon={faBed} />
                  Rooms
                </Link>

                <Link
                  to="/owner/customers"
                  className={
                    location.pathname === "/owner/customers"
                      ? "flex cursor-pointer items-center border-l-4 border-l-rose-600 py-5 px-5 text-sm font-medium text-rose-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
                      : "flex cursor-pointer items-center border-l-rose-600 py-5 px-5 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4"
                  }
                >
                  <svg
                    className="mr-4 h-5 w-5 align-middle"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 448 512"
                    height="20"
                    width="20"
                    stroke="currentColor"
                  >
                    <path
                      d="M352 128C352 198.7 294.7 256 224 256C153.3 256 96 198.7 96 128C96 57.31 153.3 0 224 0C294.7 0 352 57.31 352 128zM209.1 359.2L176 304H272L238.9 359.2L272.2 483.1L311.7 321.9C388.9 333.9 448 400.7 448 481.3C448 498.2 434.2 512 417.3 512H30.72C13.75 512 0 498.2 0 481.3C0 400.7 59.09 333.9 136.3 321.9L175.8 483.1L209.1 359.2z"
                      id="mainIconPathAttribute"
                    ></path>
                  </svg>
                  Customers
                </Link>

                <Link
                  to="/owner/bookings"
                  className={
                    location.pathname === "/owner/bookings"
                      ? "flex cursor-pointer items-center border-l-4 border-l-rose-600 py-5 px-5 text-sm font-medium text-rose-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
                      : "flex cursor-pointer items-center border-l-rose-600 py-5 px-5 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4"
                  }
                >
                  <FontAwesomeIcon icon={faHotel} className="mr-4 h-5 w-5 align-middle"/>
                  Booking Details
                </Link>

                  <Link
                    to="/owner/cancelRequests"
                    className={
                      location.pathname === "/owner/cancelRequests"
                        ? "flex cursor-pointer items-center border-l-4 border-l-rose-600 py-5 px-5 text-sm font-medium text-rose-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
                      : "flex cursor-pointer items-center border-l-rose-600 py-5 px-5 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4"
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1.5em"
                      width="1.5em"
                    >
                      <path d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4c0-1.11.89-2 2-2m4.5 9C8 11 6 13 6 15.5S8 20 10.5 20s4.5-2 4.5-4.5-2-4.5-4.5-4.5m0 1.5a3 3 0 013 3c0 .56-.15 1.08-.42 1.5L9 12.92c.42-.27.94-.42 1.5-.42m-3 3c0-.56.15-1.08.42-1.5L12 18.08c-.42.27-.94.42-1.5.42a3 3 0 01-3-3z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Cancle requests
                    </span>
                  </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerSidebar;

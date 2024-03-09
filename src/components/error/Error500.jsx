import React from "react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Error500 = () => {
  const location = useLocation();
  let role;
  const pathname = location.pathname;
  if (pathname) {
    if (pathname.startsWith("/owner")) {
      role = "owner";
    } else if (pathname.startsWith("/admin")) {
      role = "admin";
    } else if (pathname.startsWith("/")) {
      role = "user";
    }
  }
  const getHomeUrl = () => {
    // Return the home URL based on the role
    switch (role) {
      case "user":
        return "/";
      case "owner":
        return "/owner";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center p-5 w-full bg-gray-100">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-red-400 p-4">
            <div className="rounded-full bg-white p-4">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="w-20 h-20 text-red-600"
              />
            </div>
          </div>
          <h1 className="mt-5 text-4xl font-bold text-gray-800 lg:text-6xl">
            500 - Server Error
          </h1>
          <p className="text-gray-600 mt-5 text-lg">
            Oops! Something went wrong. Please try refreshing the page or
            <br />
            contact us if the problem persists.
          </p>
          <Link
            to={getHomeUrl()}
            className="mt-8 bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 inline-block"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error500;

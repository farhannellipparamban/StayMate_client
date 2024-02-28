

import React from "react";
import {
  faCar,
  faGasPump,
  faGear,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckOut = () => {
  return (
    <>
      <div className=" container mx-auto mt-10 mb-32 dark:border-gray-700 shadow border border-gray-200">
        <div className="grid grid-cols-12 mb-20">
          <div className="md:col-span-8   col-span-12">
            <div className="grid grid-cols-12">
              <div className="md:col-span-6 col-span-12">
                <h1 className="text-2xl ml-4 uppercase hover:text-red-500 font-bold">
                  room
                </h1>
                <div className="card h-96 bg-base-100 shadow-xl mb-9">
                  <figure className="px-10 pt-10 mb-5">
                    <img
                      src=""
                      alt="car image"
                      className="rounded-xl w-96 h-48 object-cover hover:scale-125 transition duration-500 cursor-pointer"
                    />
                  </figure>
                  <hr />
                  <div className="flex  justify-between px-3 pt-6">
                    <div className="flex justify-between items-center gap-3 text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-5"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L4 19h1l.67-2h12.67l.66 2h1l.67-2H22v-5zm-4-2h-5V7h5v3zM6 7h5v3H6V7zm-2 5h16v3H4v-3z"
                        />
                      </svg>
                      <p className=" font-medium text-lg">auto</p>
                    </div>
                    <div className="flex justify-between items-center gap-3 text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-5"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21 10H7V7c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4S5 4.794 5 7v3H3a1 1 0 0 0-1 1v2c0 2.606 1.674 4.823 4 5.65V22h2v-3h8v3h2v-3.35c2.326-.827 4-3.044 4-5.65v-2a1 1 0 0 0-1-1zm-1 3c0 2.206-1.794 4-4 4H8c-2.206 0-4-1.794-4-4v-1h16v1z"
                        />
                      </svg>
                      <p className="font-medium text-lg">ac</p>
                    </div>
                    <div className="flex justify-center items-center my-3 gap-3 mx-6 text-red-600">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        
                      />
                      <p className=" font-medium text-lg">
                        manjeru
                      </p>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              {/* <div className="md:col-span-6  mt-20 sm:ml-10 col-span-12">
                <div className="container">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Check in Date{" "}
                      </p>
                      <p className="text-black text-sm font-semibold">1</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-start text-sm  font-medium">
                       Check Out Date{" "}
                      </p>
                      <p className="text-black text-sm font-semibold">12</p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-center my-4">
                    <p className="text-gray-600 text-sm font-medium">
                      Total days{" "}
                      <span className="text-sm font-semibold">2</span>
                    </p>
                  </div>
                  <hr />
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Pick Up Location{" "}
                      </p>
                      <p className="text-black text-sm font-semibold">
                        malppuram
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Return Location{" "}
                      </p>
                      <p className="text-black text-sm font-semibold">
                        manjeri
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="md:col-span-4 col-span-12 sm:ml-10 mt-8 bg-white">
            <div className="  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-semibold">Amount Details</h1>
              <div className="mt-3 flex mb-4 justify-between">
                <p className="text-gray-600  text-sm">Price / day :</p>
                <h2 className="text-sm font-bold">₹ 200</h2>
              </div>
              <div className="mt-3 flex  mb-4 justify-between">
                <p className="text-gray-600  text-sm">Days selected :</p>
                <h2 className="text-sm font-bold">3</h2>
              </div>
              <div className="mt-3 flex  mb-4 justify-between">
                <p className="text-gray-600  text-sm">Total Rent Amount :</p>
                <h2 className="text-sm font-bold">₹ 1000</h2>
              </div>
              <hr />
              <br />
              <div className="flex justify-end ">
                <h1 className="font-bold text-2xl mb-2 text-black">₹ 1000</h1>
              </div>

              {/* <div className="flex items-center justify-between mb-4">
                <div>
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
                  >
                    Use wallet payment
                  </label>
                </div>
                <p>wallet balance: ₹200</p>
              </div> */}
              <button className="text-white w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;











 
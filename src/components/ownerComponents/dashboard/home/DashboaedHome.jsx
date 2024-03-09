import { faBed, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DashboaedHome = () => {
  return (
    <>
      <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-300">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 mt-4">
          <div className="col-span-1 grid">
            <div className="bg-white shadow-xl border-2  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
              <article className="icontext flex items-center">
                <div className="ml-4 ">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faIndianRupeeSign}
                      className="text-2xl text-red-500" // Use the 'text' and 'text-2xl' classes to control size and color
                    />
                    <h6 className="mb-2 text-lg font-semibold text-gray-800">
                      Total Earnings
                    </h6>
                  </div>
                  <span className="text-2xl font-bold text-red-600">
                    ₹ 34545
                  </span>
                  <span className="font-normal pl-1 text-gray-500">
                    from 132 bookings
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    earnings represent 80% of each booking
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div className="col-span-1 grid">
            <div className="bg-white shadow-xl border-2 p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
              <article className="icontext flex items-center">
                <div className="ml-4 ">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faIndianRupeeSign}
                      className="text-2xl text-red-500"
                    />
                    <h6 className="mb-2 text-lg font-semibold text-gray-800">
                      Currnet month
                    </h6>
                  </div>
                  <span className="text-2xl font-bold text-red-600">
                    ₹ 384
                  </span>
                  <span className="font-normal pl-1 text-gray-500">987343</span>
                  <p className="text-sm text-gray-600 mt-1">
                    earnings represent 80% of each booking
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="col-span-1 grid">
            <div className="bg-white shadow-xl border-2 p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
              <article className="icontext flex items-center">
                <div className="ml-4">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faIndianRupeeSign}
                      className="text-2xl text-red-500"
                    />
                    <h6 className="mb-2 text-lg font-semibold text-gray-800">
                      Today revenue
                    </h6>
                  </div>
                  <span className="text-2xl font-bold text-red-600">
                    ₹347612
                  </span>
                  <span className="font-normal pl-1 text-gray-500">
                    from 3532 bookings
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    earnings represent 80% of each booking
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div className="col-span-1 grid">
            <div className="bg-white shadow-xl border-2 p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
              <article className="icontext flex items-center">
                <div className="ml-4">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faBed}
                      className="text-2xl text-red-500"
                    />
                    <h6 className="mb-2 text-lg font-semibold text-gray-800">
                      Total rooms
                    </h6>
                  </div>
                  <span className="text-2xl font-bold text-red-600">35</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Join our community and connect with cars!
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="md:w-2/3 md:h-96 w-full">
            {/* <LineChart salesData={reportData?.salesData} /> */}
          </div>

          <div className="md:w-1/3 h-96 w-full mt-4">
            {/* <PieChart count={reportData?.bookingStatusCounts} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboaedHome;

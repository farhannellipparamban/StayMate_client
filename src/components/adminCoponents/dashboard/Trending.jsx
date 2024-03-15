import React from "react";

const Trending = ({ trendings }) => {
  return (
    <>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full"
                  src={trendings?.roomDetails?.roomImage[0]}
                  alt="Room image"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                  {trendings?.roomDetails?.roomName}
                </p>
                <p className="text-sm text-gray-900 truncate dark:text-gray-600">
                  Total bookings : <span>{trendings?.totalBookings}</span>
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-black">
                ₹ {trendings?.roomDetails?.rent}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Trending;

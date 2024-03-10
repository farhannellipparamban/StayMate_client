import React from "react";

const DetailsUser = ({ bookingData }) => {
  const startTimestamp = new Date(bookingData.startDate).getTime();
  const endTimestamp = new Date(bookingData.endDate).getTime();
  const dayDifference = (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Success":
        return "text-green-600";
      case "Cancelled":
        return "text-red-500";
      case "Checked In":
        return "text-green-600";
      case "Checked Out":
        return "text-blue-600";
      default:
        return "text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return "Payment not done";
      case "Success":
        return "Room booked Successfully";
      case "Cancelled":
        return "Booking cancelled";
      case "Checked In":
        return "Room Checked In";
      case "Checked Out":
        return "Room Checked Out";
      default:
        return "Payment Failed !!";
    }
  };
  return (
    <div className="flex flex-col items-center p-6 md:p-10 bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-200 dark:hover:bg-gray-200">
      <div className="md:w-1/2 lg:w-2/4">
        <img
          className="object-cover w-full h-64 md:h-auto rounded-lg md:rounded-lg"
          src={bookingData?.room?.roomImages[0]}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center p-4 md:w-1/2 lg:w-2/4 font-serif w-full leading-normal">
        <h1 className="mb-2 uppercase text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
          {bookingData?.room?.roomName}
        </h1>
        <div className="flex justify-start gap-5">
          <p className="my-3 text-lg font-semibold">
            Owner Name: <span>{bookingData?.owner?.name}</span>
          </p>
        </div>
        <h1 className="mb-2 text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-red-600">
          Amount Paid: ₹ {bookingData?.totalBookingRent}
        </h1>
        <p className="my-5 text-lg font-semibold">
          Booking Status:{" "}
          <span className={getStatusColor(bookingData?.bookingStatus)}>
            {getStatusText(bookingData?.bookingStatus)}
          </span>
        </p>
        <div className="container">
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
            <div>
              <p className="text-gray-800 text-sm font-medium">Check In Date</p>
              <p className="text-black text-sm font-semibold">
                {new Date(bookingData?.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-800 text-sm font-medium">
                Check Out date
              </p>
              <p className="text-black text-sm font-semibold">
                {new Date(bookingData?.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <hr className="border-t-1 border-black" />
          <div className="flex justify-center my-4">
            <p className="text-gray-900 text-sm font-medium">
              Total days selected{" "}
              <span className="text-sm font-semibold">{dayDifference}</span>
            </p>
          </div>
          <hr className="border-t-1 border-black" />
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-gray-800 text-sm font-medium">Location </p>
              <p className="text-black text-sm font-semibold">
                {bookingData?.chooseLocation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsUser;

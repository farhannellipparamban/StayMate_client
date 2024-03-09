import React from "react";
import { changeBookingStatus } from "../../../../api/ownerApi";
import { toast } from "react-toastify";

const DetailsOwner = ({ bookingData, setBookingData }) => {
  const startTimestamp = new Date(bookingData?.startDate).getTime();
  const endTimestamp = new Date(bookingData?.endDate).getTime();
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
  const handleBookingStatus = async (status, bookingId) => {
    try {
      const res = await changeBookingStatus(
        status,
        bookingId,
        bookingData?.startDate,
        bookingData?.endDate,
        bookingData?.room
      );
      setBookingData((prevData) => ({ ...prevData, bookingStatus: status }));
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center p-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-200 dark:hover:bg-gray-200">
        <div className="md:w-2/4">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-l-lg"
            src={bookingData?.room?.roomImages[0]}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center p-4  w-full leading-normal font-serif">
          <div className="flex justify-between">
            <h1 className="mb-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
              {bookingData?.room?.roomName}
            </h1>

            <div className="flex justify-end">
              {new Date(bookingData?.endDate) > new Date() &&
                bookingData?.bookingStatus === "Success" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleBookingStatus("Checked In", bookingData?._id)
                    }
                    className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Checked In
                  </button>
                )}
              {new Date(bookingData?.endDate) > new Date() &&
                bookingData?.bookingStatus === "Checked In" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleBookingStatus("Checked Out", bookingData?._id)
                    }
                    className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Checked Out
                  </button>
                )}
            </div>
          </div>
          <div className="flex justify-start gap-5">
            <p className="my-3 text-lg font-semibold">
              Booked User :
              <span> {bookingData?.user.name}</span>
            </p>
          </div>
          <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-red-600">
            Amount Paid : ₹ {bookingData?.totalBookingRent}
          </h1>
          <p className="my-5 text-lg font-semibold">
            Booking Status :{" "}
            {new Date() > new Date(bookingData?.endDate) ? (
              <span className="text-green-700 font-semibold text-sm">
                Completed
              </span>
            ) : (
              <span className={getStatusColor(bookingData?.bookingStatus)}>
                {getStatusText(bookingData?.bookingStatus)}
              </span>
            )}
          </p>
          <div className="container">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-800 text-sm font-medium">
                  Check In Date{" "}
                </p>
                <p className="text-black text-sm font-semibold">
                  {new Date(bookingData?.startDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-800 text-start text-sm  font-medium">
                  Check Out Date{" "}
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
            <hr class="border-t-1 border-black" />
            <div className="flex justify-center my-4">
              <p className="text-gray-900 text-sm font-medium">
                Total days selected{" "}
                <span className="text-sm font-semibold">{dayDifference}</span>
              </p>
            </div>
            <hr class="border-t-1 border-black" />
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
    </>
  );
};

export default DetailsOwner;

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
      case "CheckedIn":
        return "text-green-600";
      case "CheckedOut":
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
      case "CheckedIn":
        return "Room Checked In";
      case "CheckedOut":
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
      <div class="flex flex-col items-center p-4 md:p-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-500 dark:bg-gray-200 dark:hover:bg-gray-200">
        <div class="w-full md:w-2/4 md:mr-4">
          <img
            class="object-cover w-full h-64 md:h-96 rounded-t-lg md:rounded-l-lg"
            src={bookingData?.room?.roomImages[0]}
            alt=""
          />
        </div>
        <div class="flex flex-col justify-center w-full leading-normal font-serif">
          <div class="flex justify-between mb-4 md:flex md:items-center">
            <h1 class="mb-2 uppercase text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
              {bookingData?.room?.roomName}
            </h1>
            <div class="flex justify-end">
              {new Date(bookingData?.endDate) > new Date() &&
                bookingData?.bookingStatus === "Success" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleBookingStatus("CheckedIn", bookingData?._id)
                    }
                    class="btn-success"
                  >
                    Checked In
                  </button>
                )}
              {new Date(bookingData?.endDate) > new Date() &&
                bookingData?.bookingStatus === "CheckedIn" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleBookingStatus("CheckedOut", bookingData?._id)
                    }
                    class="btn-success"
                  >
                    Checked Out
                  </button>
                )}
            </div>
          </div>
          <div class="flex justify-start gap-5 mb-4 md:mb-0">
            <p class="my-3 text-lg font-semibold">
              Booked User : <span> {bookingData?.user.name}</span>
            </p>
          </div>
          <h1 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-red-600">
            Amount Paid : ₹ {bookingData?.totalBookingRent}
          </h1>
          <p class="my-5 text-lg font-semibold">
            Booking Status :{" "}
            {new Date() > new Date(bookingData?.endDate) ? (
              <span class="text-green-700 font-semibold text-sm">
                Completed
              </span>
            ) : (
              <span class={getStatusColor(bookingData?.bookingStatus)}>
                {getStatusText(bookingData?.bookingStatus)}
              </span>
            )}
          </p>
          <div class="container">
            <div class="flex flex-col md:flex-row justify-between items-center mb-4">
              <div class="mb-4 md:mb-0">
                <p class="text-gray-800 text-sm font-medium">Check In Date </p>
                <p class="text-black text-sm font-semibold">
                  {new Date(bookingData?.startDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </p>
              </div>
              <div>
                <p class="text-gray-800 text-start text-sm  font-medium">
                  Check Out Date{" "}
                </p>
                <p class="text-black text-sm font-semibold">
                  {new Date(bookingData?.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <hr class="border-t-1 border-black" />
            <div class="flex justify-center my-4">
              <p class="text-gray-900 text-sm font-medium">
                Total days selected{" "}
                <span class="text-sm font-semibold">{dayDifference}</span>
              </p>
            </div>
            <hr class="border-t-1 border-black" />
            <div class="flex justify-between mb-4">
              <div>
                <p class="text-gray-800 text-sm font-medium">Location </p>
                <p class="text-black text-sm font-semibold">
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

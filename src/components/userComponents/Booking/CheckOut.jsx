import React, { useState } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roomBooking } from "../../../api/userApi";
import { userLogin } from "../../../reduxStore/slices/userSlice";
import Loading from "../../loading/Loading";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((state) => state.userReducer);
  console.log(user);
  const { room, values } = state;
  
  //   const startDate = values.CheckInDate;
  //   const endDate = values.CheckOutDate;

  //   const startTimestamp = new Date(values.CheckInDate).getTime();
  //   const endTimestamp = new Date(values.CheckOutDate).getTime();
  //   const dayDiffrence = (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
  //   const totalAmount = dayDiffrence * room.rent;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await roomBooking({
        ...room,
        userId: user._id,
      });

      dispatch(userLogin({ user: res?.data?.user, token }));
      navigate("/bookingSuccess", {
        state: {
          orderDetails: res?.data?.booingDetails,
          roomDetails: res?.data?.roomDetails,
        },
      });
      toast.success(res?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-10 mb-32 dark:border-gray-700 shadow border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1 col-span-1">
              <h1 className="text-2xl ml-4 uppercase hover:text-red-500 font-bold">
                {room.roomName}
              </h1>
              <div className="card h-auto bg-base-100 shadow-xl mb-9">
                <figure className="px-10 pt-10 mb-5">
                  <img
                    src={room?.roomImages[0]}
                    alt="Room image"
                    className="rounded-xl w-full object-cover hover:scale-110 transition duration-500 cursor-pointer"
                  />
                </figure>
                <hr />
                <div className="p-5">
                  <div className="flex flex-wrap justify-between items-center gap-3 mb-3">
                    <div className="flex items-center gap-3 text-red-600 w-full md:w-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L4 19h1l.67-2h12.67l.66 2h1l.67-2H22v-5zm-4-2h-5V7h5v3zM6 7h5v3H6V7zm-2 5h16v3H4v-3z"
                        />
                      </svg>
                      <p className="font-medium text-lg">{room?.model}</p>
                    </div>
                    <div className="flex items-center gap-3 text-red-600 w-full md:w-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21 10H7V7c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4S5 4.794 5 7v3H3a1 1 0 0 0-1 1v2c0 2.606 1.674 4.823 4 5.65V22h2v-3h8v3h2v-3.35c2.326-.827 4-3.044 4-5.65v-2a1 1 0 0 0-1-1zm-1 3c0 2.206-1.794 4-4 4H8c-2.206 0-4-1.794-4-4v-1h16v1z"
                        />
                      </svg>
                      <p className="font-medium text-lg">{room?.acType}</p>
                    </div>
                    <div className="flex items-center gap-3 text-red-600 w-full md:w-auto">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p className="font-medium text-lg">{room?.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 col-span-1 mt-10 md:mt-0">
              <div className="p-6 mt-12 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-semibold">Amount Details</h1>
                <div className="mt-3 flex flex-col sm:flex-row mb-4 justify-between">
                  <p className="text-gray-600 text-sm">Price / day :</p>
                  <h2 className="text-sm font-bold">₹ {room?.rent}</h2>
                </div>
                {/* <div className="mt-3 flex mb-4 justify-between">
            <p className="text-gray-600 text-sm">Days selected :</p>
            <h2 className="text-sm font-bold">{dayDiffrence}</h2>
        </div> */}
                <div className="mt-3 flex flex-col sm:flex-row mb-4 justify-between">
                  <p className="text-gray-600 text-sm">Total Rent Amount :</p>
                  <h2 className="text-sm font-bold">₹ {room?.rent}</h2>
                </div>
                <hr className="my-4" />
                <div className="flex justify-end">
                  <h1 className="font-bold text-2xl mb-4 text-black">
                    ₹ {room?.rent}
                  </h1>
                </div>
                <button
                  onClick={handleSubmit}
                  className="text-white w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOut;

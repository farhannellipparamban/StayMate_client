import React, { useEffect, useState } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allCoupons,
  applyCoupon,
  roomBooking,
  verifyPayment,
} from "../../../api/userApi";
import { userLogin } from "../../../reduxStore/slices/userSlice";
import Loading from "../../loading/Loading";
import { toast } from "react-toastify";
import { loadScript } from "../../../utils/razorpay/loadScript";

const CheckOut = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [walletChecked, setWalletChecked] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const { user, token } = useSelector((state) => state.userReducer);
  const { room, values } = state;
  console.log(values);

  const startDate = values.CheckInDate;
  const endDate = values.CheckOutDate;
  const chooseLocation = values.chooseLocation;

  const startTimestamp = new Date(values.CheckInDate).getTime();
  const endTimestamp = new Date(values.CheckOutDate).getTime();
  const dayDiffrence = (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
  const totalAmount = dayDiffrence * room.rent;
  const rezorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await allCoupons(); // Fetch available coupons from backend
      setCoupons(res.data.coupons);
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch coupons");
    }
  };

  const handleApplyCoupon = async () => {
    try {
      setLoading(true);
      const res = await applyCoupon({ couponCode }); // Send a request to apply coupon with the entered code
      setLoading(false);
      if (res?.status === 200) {
        // If coupon applied successfully
        toast.success(res?.data?.message);
        // Update the total amount or any other relevant UI changes here
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await roomBooking({
        ...room,
        startDate,
        endDate,
        totalAmount,
        chooseLocation,
        userId: user._id,
        walletChecked,
      });

      if (walletChecked) {
        toast.success(res?.data?.message);

        dispatch(userLogin({ user: res?.data?.user, token }));
        navigate("/bookingSuccess", {
          state: {
            orderDetails: res?.data?.booingDetails,
            roomDetails: res?.data?.roomDetails,
          },
        });
      } else {
        razorpayPayment(res?.data?.bookingData);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };
  const razorpayPayment = async (bookingData) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay sdk failed lodad");
      return;
    }
    setLoading(false);
    var options = {
      key: rezorpayKey, // Enter the Key ID generated from the Dashboard
      amount: bookingData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: bookingData.currency,
      name: "Stay Mate",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: bookingData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        try {
          const res = await verifyPayment(response, {
            ...bookingData,
            roomId: room._id,
            startDate: startDate,
            endDate: endDate,
          });
          if (res?.status === 200) {
            toast.success(res?.data?.message);
            navigate("/bookingSuccess", {
              state: {
                orderDetails: res?.data?.booingDetails,
                roomDetails: res?.data?.roomDetails,
              },
            });
          }
        } catch (error) {
          toast.error(error.response?.data?.message);
          console.log(error);
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FF0000",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handleWalletUsed = (e) => {
    setWalletChecked(e.target.checked);
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
        <div className="p-10 mt-12 md:mt-0 bg-white border border-gray-200 rounded-lg shadow-md  dark:border-gray-700 mx-10 md:mx-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1 col-span-1 font-serif">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl uppercase hover:text-red-500 font-bold">
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
                {/* <div className="md:col-span-6  mt-20 sm:ml-10 col-span-12">
                  <div className="container">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">
                          Check In Date{" "}
                        </p>
                        <p className="text-black text-sm font-semibold">
                          {values?.values?.CheckInDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-start text-sm  font-medium">
                          Checked Out Date{" "}
                        </p>
                        <p className="text-black text-sm font-semibold">
                          {values?.values?.CheckOutDate}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">
                          Total days{" "}
                          <span className="text-black text-sm font-semibold">
                            {dayDiffrence}
                          </span>
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-start text-sm  font-medium">
                          Location{" "}
                        </p>
                        <p className="text-black text-sm font-semibold">
                          {values?.values?.chooseLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="md:col-span-1 col-span-1 mt-10 md:mt-0">
              <div className="p-6 mt-12 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-serif font-bold">
                  Amount Details
                </h1>
                <div className="mt-10 flex flex-col sm:flex-row mb-8 justify-between">
                  <p className="text-black text-md font-bold">
                    CheckInDate
                    <h2 className="text-sm font-bold">
                      {values?.values?.CheckInDate}
                    </h2>
                  </p>
                  <p className="text-black text-md font-bold">
                    CheckOutDate
                    <h2 className="text-sm font-bold">
                      {values?.values?.CheckOutDate}
                    </h2>
                  </p>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row mb-4 justify-between">
                  <p className="text-gray-600 text-sm">Price / day :</p>
                  <h2 className="text-sm font-bold">₹ {room?.rent}</h2>
                </div>
                <div className="mt-3 flex mb-4 justify-between">
                  <p className="text-gray-600 text-sm">Days selected :</p>
                  <h2 className="text-sm font-bold">{dayDiffrence}</h2>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row mb-4 justify-between">
                  <p className="text-gray-600 text-sm">Total Rent Amount :</p>
                  <h2 className="text-sm font-bold">₹ {totalAmount}</h2>
                </div>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                {/* Apply Coupon Button */}
                <button onClick={handleApplyCoupon}>Apply Coupon</button>

                <button
                  data-modal-target="select-modal"
                  data-modal-toggle="select-modal"
                  class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Toggle modal
                </button>

                <div
                  id="select-modal"
                  tabindex="-1"
                  aria-hidden="true"
                  class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                  <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                          Open positions
                        </h3>
                        <button
                          type="button"
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-toggle="select-modal"
                        >
                          <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span class="sr-only">Close modal</span>
                        </button>
                      </div>
                      <div class="p-4 md:p-5">
                        <p class="text-gray-500 dark:text-gray-400 mb-4">
                          Select your desired position:
                        </p>
                        <ul class="space-y-4 mb-4">
                          <li>
                            <input
                              type="radio"
                              id="job-1"
                              name="job"
                              value="job-1"
                              class="hidden peer"
                              required
                            />
                            <label
                              for="job-1"
                              class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                            >
                              <div class="block">
                                <div class="w-full text-lg font-semibold">
                                  UI/UX Engineer
                                </div>
                                <div class="w-full text-gray-500 dark:text-gray-400">
                                  Flowbite
                                </div>
                              </div>
                              <svg
                                class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                              </svg>
                            </label>
                          </li>
                          <li>
                            <input
                              type="radio"
                              id="job-2"
                              name="job"
                              value="job-2"
                              class="hidden peer"
                            />
                            <label
                              for="job-2"
                              class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                            >
                              <div class="block">
                                <div class="w-full text-lg font-semibold">
                                  React Developer
                                </div>
                                <div class="w-full text-gray-500 dark:text-gray-400">
                                  Alphabet
                                </div>
                              </div>
                              <svg
                                class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                              </svg>
                            </label>
                          </li>
                          <li>
                            <input
                              type="radio"
                              id="job-3"
                              name="job"
                              value="job-3"
                              class="hidden peer"
                            />
                            <label
                              for="job-3"
                              class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                            >
                              <div class="block">
                                <div class="w-full text-lg font-semibold">
                                  Full Stack Engineer
                                </div>
                                <div class="w-full text-gray-500 dark:text-gray-400">
                                  Apple
                                </div>
                              </div>
                              <svg
                                class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                              </svg>
                            </label>
                          </li>
                        </ul>
                        <button class="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Next step
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <div className="flex justify-end">
                  <h1 className="font-bold text-2xl mb-4 text-black">
                    ₹ {totalAmount}
                  </h1>
                </div>
                {user?.wallet >= totalAmount && (
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        checked={walletChecked}
                        onChange={handleWalletUsed}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-900"
                      >
                        Use wallet payment
                      </label>
                    </div>
                    <p>wallet balance: ₹ {user?.wallet}</p>
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  className="text-white w-full md:w-auto bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm md:text-base lg:text-lg px-5 py-2.5 mb-6 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
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

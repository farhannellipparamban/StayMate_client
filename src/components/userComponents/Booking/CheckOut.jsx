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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmounts, setTotalAmounts] = useState(0);

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
      console.log(res, "cdiojd"); // Assuming `coupon` is the array containing coupons
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch coupons");
    }
  };

  const calculateDiscountedAmount = (coupon) => {
    if (coupon.discountType === "Percentage Type") {
      return totalAmount - (totalAmount * coupon.discountAmount) / 100;
    } else {
      return totalAmount - coupon.discountAmount;
    }
  };

  const handleApplyCoupon = async () => {
    try {
      setLoading(true);
      const res = await applyCoupon(couponCode, user._id);
      console.log(res);
      setLoading(false);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        // Calculate discounted amount and update totalAmounts state
        const appliedCoupon = coupons.find(
          (coupon) => coupon.code === couponCode
        );
        if (appliedCoupon) {
          const discountedAmount = calculateDiscountedAmount(appliedCoupon);
          setTotalAmounts(discountedAmount);
        } else {
          // If coupon code is not valid, reset totalAmounts to original totalAmount
          setTotalAmounts(totalAmount);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await roomBooking({
        ...room,
        startDate,
        endDate,
        totalAmount: totalAmounts,
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
                    <h2 className="text-sm font-bold">{values?.CheckInDate}</h2>
                  </p>
                  <p className="text-black text-md font-bold">
                    CheckOutDate
                    <h2 className="text-sm font-bold">
                      {values?.CheckOutDate}
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
                <div className="flex flex-row">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="ml-3 block bg-red-600 text-white font-semibold rounded-md py-2 px-4 transition duration-300 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200 focus:border-red-400"
                    type="button"
                  >
                    Apply Coupon
                  </button>
                </div>

                <button
                  onClick={toggleModal}
                  className="block bg-red-600 text-white font-semibold rounded-md py-2 px-4 mt-2 transition duration-300 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200 focus:border-red-400"
                  type="button"
                >
                  Available Coupons
                </button>
                {isModalOpen && (
                  <div
                    id="select-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className={`fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
                      isModalOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div class="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-md w-full max-w-3xl mx-4 sm:mx-0">
                      <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                          <h3 class="text-2xl font-semibold text-gray-900">
                            Available Coupons
                          </h3>
                          <button
                            onClick={toggleModal}
                            type="button"
                            class="text-gray-600 hover:text-gray-800 focus:outline-none"
                            aria-label="Close modal"
                          >
                            <svg
                              class="w-8 h-8"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-semibold">
                          {coupons &&
                            coupons.map((coupon) => (
                              <div
                                key={coupon._id}
                                class="bg-white rounded-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 relative overflow-hidden"
                              >
                                <div class="absolute  top-0 right-0 bg-gray-900 py-1 px-2 rounded-bl-lg">
                                  <span
                                    class={`text-sm font-semibold ${
                                      coupon.discountType === "Percentage Type"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {" "}
                                    {coupon.discountType === "Percentage Type"
                                      ? `${coupon.discountAmount}% OFF`
                                      : `₹${coupon.discountAmount} OFF`}
                                  </span>
                                </div>
                                <div class="flex items-center justify-between mb-4">
                                  <h4 class="text-lg font-bold text-gray-900">
                                    {coupon.code}
                                  </h4>
                                </div>
                                <div class="text-gray-600 mb-2">
                                  Expires:{" "}
                                  {new Date(
                                    coupon.expiryDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </div>
                                <div class="text-gray-600 mb-2">
                                  Balance: {coupon.maxUsers}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <hr className="my-4" />
                {/* <div className="flex justify-end">
                  <h1 className="font-bold text-2xl mb-4 text-black">
                    ₹ {totalAmount}
                  </h1>
                </div> */}
                {!couponCode ? (
                  <div className="flex justify-end">
                    <h1 className="font-bold text-2xl mb-4 text-black">
                      ₹ {totalAmount}
                    </h1>
                  </div>
                ) : (
                  <div className="mt-3 flex flex-col sm:flex-row mb-4 justify-between">
                    <p className="text-gray-600 text-lg ">
                      Discounted Amount :
                    </p>
                    <h1 className="font-bold text-2xl mb-4 text-black">
                      ₹ {totalAmounts}
                    </h1>
                  </div>
                )}
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

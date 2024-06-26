import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { couponList, deleteCoupon } from "../../api/adminApi";
import Loading from "../loading/Loading";
import Pagination from "../common/Pagination";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCouponId, setSelectedCouponId] = useState(null); // Added state to store selected coupon ID

  const navigate = useNavigate();
  const couponsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    couponList()
      .then((res) => {
        setCoupons(res?.data?.coupons);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteCoupon(selectedCouponId);
      if (res?.status === 200) {
        setCoupons((prevCoupons) =>
          prevCoupons.filter((coupon) => coupon._id !== selectedCouponId)
        );
        toast.success(res?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.error("Error deleting coupon:", error);
    } finally {
      setSelectedCouponId(null); // Reset selected coupon ID
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const handleShowConfirmation = (couponId) => {
    setSelectedCouponId(couponId); // Set selected coupon ID when modal is triggered
  };

  // const handleInputChange = (e) => {
  //   setSearchInput(e.target.value);
  //   setCurrentPage(1);
  // };

  const filteredData = !searchInput
    ? coupons
    : coupons.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchInput.toLowerCase())
      );

  const lastIndex = currentPage * couponsPerPage;
  const firstIndex = lastIndex - couponsPerPage;
  const couponsInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / couponsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <>
      <div className="w-full md:w-4/4 px-4 mb-5 mt-5">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-300">
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <>
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="flex mb-6">
                  <h3 className="text-2xl pt-2">Coupon List</h3>

                  <button
                    onClick={() => navigate("/admin/addCoupons")}
                    className="ml-4 text-lg font-serif font-semibold bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    Add Coupons
                  </button>
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="flex items-center justify-end py-4 bg-gray-400 gray:bg-gray-700">
                    <label htmlFor="table-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M150 0 L75 200 L225 200 Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="table-search-Rooms"
                        value={searchInput}
                        onChange={handleInputChange}
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white focus:ring-blue-900 focus:border-blue-900 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-900 white:text-black white:focus:ring-blue-900 white:focus:border-blue-900"
                        placeholder="Search for coupons"
                      />
                    </div>
                  </div>
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-900 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-900 dark:bg-gray-400">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">User Count</th>
                        <th className="px-4 py-3">Discount Type</th>
                        <th className="px-4 py-3">Expiry Date</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-300">
                      {couponsInSinglePage.length > 0 ? (
                        couponsInSinglePage.map((coupon) => (
                          <tr
                            key={coupon?._id}
                            className="text-gray-700 dark:text-gray-900"
                          >
                            <td className="px-4 py-3">{coupon?._id}</td>
                            <td className="px-4 py-3">{coupon?.code}</td>
                            <td className="px-4 py-3">
                              {coupon.discountAmount}
                            </td>
                            <td className="px-4 py-3">{coupon?.maxUsers}</td>
                            <td className="px-4 py-3">
                              {coupon?.discountType}
                            </td>
                            <td className="px-4 py-3">
                              {new Date(coupon?.expiryDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <Link to={`/admin/editCoupon/${coupon._id}`}>
                                  <Button
                                    className="action-button edit-button px-3 py-1 bg-black text-white rounded-lg hover:bg-black focus:outline-none focus:bg-black"
                                    aria-label="Edit"
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  className="action-button delete-button px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                  aria-label="Delete"
                                  onClick={() =>
                                    handleShowConfirmation(coupon._id)
                                  } // Show confirmation modal
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-4 text-center text-gray-900 dark:text-dark"
                          >
                            No coupons
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <Pagination
                totalPages={totalPages}
                numbers={numbers}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />

              {selectedCouponId && (
                <div
                  id="deleteModal"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                >
                  <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                    {/* Modal content */}
                    <svg
                      className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="text-current fill-current"
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>

                    <p className="mb-4 text-gray-500 dark:text-black">
                      Are you sure you want to delete this coupon?
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                      <button
                        onClick={() => setSelectedCouponId(null)} // Close modal
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                      <button
                        onClick={handleDelete} // Delete coupon
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        Yes, I'm sure
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CouponList;

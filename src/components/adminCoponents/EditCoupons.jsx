import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCoupon, editCouponDetails } from "../../api/adminApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { CouponValidation } from "../../validations/admin/couponValidation";
import Loading from "../loading/Loading";

const EditCoupons = () => {
  const [coupon, setCoupon] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { couponId } = useParams();

  useEffect(() => {
    editCouponDetails(couponId)
      .then((res) => {
        setCoupon(res?.data?.coupon);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await editCoupon({
        ...values,
        couponId,
      });
      if (res?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        navigate("/admin/couponList");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        code: coupon.code,
        discountType: coupon.discountType,
        originalPrice: coupon.originalPrice,
        finalPrice: coupon.finalPrice,
        maxUsers: coupon.maxUsers,
        discountAmount: coupon.discountAmount,
        expiryDate: coupon.expiryDate,
      },
      validationSchema: CouponValidation,
      onSubmit,
      enableReinitialize: true,
    });
  
  return (
    <>
    {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
      <div className="flex justify-center items-center h-4/5 w-full bg-gray-100 py-10">
        <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 p-8 bg-white rounded-lg shadow-lg mt-3 mb-3">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center font-serif">
            Edit Coupons
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Coupon Code
              </label>
              <input
                placeholder="Enter Coupon Code"
                id="code"
                name="code"
                type="text"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full"
              />
              {touched.code && errors.code && (
                <p className="text-red-600 text-sm mt-1">{errors.code}</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="discountType"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Discount Type
                </label>
                <select
                  className="block w-full mt-3 text-sm border p-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  name="discountType"
                  id="discountType"
                  value={values.discountType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Coupon Type</option>
                  <option>Fixed Amount</option>
                  <option>Percentage Type</option>
                </select>
                {touched.discountType && errors.discountType && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.discountType}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={values.expiryDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full ${
                    touched.expiryDate && errors.expiryDate
                      ? "border-red-500"
                      : ""
                  }`} 
                  required
                />
                {touched.expiryDate && errors.expiryDate && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.expiryDate}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Original Price
                </label>
                <input
                  placeholder="Enter the amount"
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  value={values.originalPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full"
                />
                {touched.originalPrice && errors.originalPrice && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.originalPrice}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="finalPrice"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Final Price
                </label>
                <input
                  placeholder="Enter the final Amount"
                  id="finalPrice"
                  name="finalPrice"
                  type="number"
                  value={values.finalPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full"
                />
                {touched.finalPrice && errors.finalPrice && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.finalPrice}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="maxUsers"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Max Coupons
                </label>
                <input
                  placeholder="Enter the count of coupons"
                  id="maxUsers"
                  name="maxUsers"
                  type="number"
                  value={values.maxUsers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full"
                />
                {touched.maxUsers && errors.maxUsers && (
                  <p className="text-red-600 text-sm mt-1">{errors.maxUsers}</p>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <label
                  htmlFor="discountAmount"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Discount Amount
                </label>
                <input
                  placeholder="Enter the discount amount"
                  id="discountAmount"
                  name="discountAmount"
                  type="number"
                  value={values.discountAmount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full"
                />
                {touched.discountAmount && errors.discountAmount && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.discountAmount}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 w-full"
            >
              Add Coupon
            </button>
          </form>
        </div>
      </div>
      )}
    </>
  );
};

export default EditCoupons;

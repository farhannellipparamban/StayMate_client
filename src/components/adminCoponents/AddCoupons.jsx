import React from "react";
import { addCoupons } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { CouponValidation } from "../../validations/admin/couponValidation";

const AddCoupons = () => {
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      const res = await addCoupons(values);
      if (res.status === 201) {
        navigate("/admin/couponList");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error, "response in error");
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        code: "",
        discountType: "",
        maxUsers: "",
        discountAmount: "",
        expiryDate: "",
        minRoomRent: "",
        maxDiscount: "",
      },
      validationSchema: CouponValidation,
      onSubmit,
    });
  return (
    <>
      <div className="flex justify-center items-center h-4/5 w-full bg-gray-100 py-10">
        <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 p-8 bg-white rounded-lg shadow-lg mt-3 mb-3">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center font-serif">
            Add Coupons
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
                  value={values.expiryDate} // Add value prop
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full ${
                    touched.expiryDate && errors.expiryDate
                      ? "border-red-500"
                      : ""
                  }`} // Add error styling
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
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="minRoomRent"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Minimum Room Rent
                </label>
                <input
                  placeholder="Enter the minimum room rent"
                  id="minRoomRent"
                  name="minRoomRent"
                  type="number"
                  value={values.minRoomRent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full"
                />
                {touched.minRoomRent && errors.minRoomRent && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.minRoomRent}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="maxDiscount"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Maximum Discount
                </label>
                <input
                  placeholder="Enter the maximum discount amount"
                  id="maxDiscount"
                  name="maxDiscount"
                  type="number"
                  value={values.maxDiscount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full"
                />
                {touched.maxDiscount && errors.maxDiscount && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.maxDiscount}
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
    </>
  );
};

export default AddCoupons;

import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../api/userApi";
import { userSchema } from "../../validations/user/userSignupValidation";
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      const res = await userSignup(values);
      if (res?.status === 201) {
        const { user, otpId } = res.data;
        toast.success(res?.data?.message);
        navigate("/otp", {
          state: { userEmail: user.email, otpId: otpId, userId: user._id },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      },
      validationSchema: userSchema,
      onSubmit,
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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">

            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Create a new account
            </h2>
           
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit}>
                <div>
                  {/* <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label> */}
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      required=""
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-600">{errors.name}</p>
                    )}
                    <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {/* <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">
            Email address
          </label> */}
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      required=""
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-600">{errors.email}</p>
                    )}
                    <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  {errors.mobile && touched.mobile && (
                    <p className="text-red-600">{errors.mobile}</p>
                  )}
                </div>

                <div className="mt-6">
                  {/* <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Password
            </label> */}
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required=""
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-600">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  {/* <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                Confirm Password
            </label> */}
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={values.cpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required=""
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                    {errors.cpassword && touched.password && (
                      <p className="text-red-600">{errors.cpassword}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff0808] hover:bg-[#ff4848] focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Register Now
                    </button>
                  </span>
                  <div className="mt-3">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login" className="text-blue-500">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSignup;

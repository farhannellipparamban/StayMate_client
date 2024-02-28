import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ownerSignup } from "../../api/ownerApi.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { ownerSignupSchema } from "../../validations/owner/ownerSignupValidation.js";
import Loading from "../../components/loading/Loading.jsx";

const OwnerSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await ownerSignup(values);
      if (res?.status === 201) {
        const { owner, otpId } = res.data;
        toast(res?.data?.status);
        navigate("/owner/otp", {
          state: {
            ownerEmail: owner.email,
            otpId: otpId,
            ownerId: owner._id,
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.status);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      },
      validationSchema: ownerSignupSchema,
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
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-screen px-6">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    "url('/images/meritt-thomas-HIEZBt6XRno-unsplash.jpg')",
                }}
              ></div>
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">
                  Create an Account!
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div className="mb-4">
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="Name"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="mobile"
                      type="text"
                      placeholder="Mobile"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.mobile && touched.mobile && (
                      <p className="text-red-600">{errors.mobile}</p>
                    )}
                  </div>
                  <div className="mb-4 md:mb-0">
                    <div className="flex flex-col w-full">
                      <input
                        className="w-full px-3 py-2 mb-7 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password && (
                        <p className="text-red-600">{errors.password}</p>
                      )}
                      <input
                        className="w-full px-3 py-2 mb-8 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="c_password"
                        type="password"
                        placeholder="Confirm Password"
                        name="cpassword"
                        value={values.cpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.cpassword && touched.cpassword && (
                        <p className="text-red-600">{errors.cpassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6 text-center">
                    <button className="w-full px-4 py-2 font-bold text-white bg-[#ff0808] hover:bg-[#ff4848] rounded-full focus:outline-none focus:shadow-outline">
                      Register Account
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <p>
                      Already have an account?{" "}
                      <Link
                        to="/owner/login"
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerSignup;

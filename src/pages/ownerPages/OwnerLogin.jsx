import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ownerLoginVerification } from "../../api/ownerApi";
import { ownerLogin } from "../../reduxStore/slices/ownerSlice";
import { useFormik } from "formik";
import { ownerLoginSchema } from "../../validations/owner/ownerLoginValidation";
import Loading from "../../components/loading/Loading";
import OwnerGoogleLogin from "../../assets/googleLogin/OwnerGoogleLogin";

const OwnerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await ownerLoginVerification(values);
      if (res?.status === 200) {
        const { token, owner } = res.data;
        localStorage.setItem("ownerToken", token);
        dispatch(
          ownerLogin({
            token: token,
            owner: owner,
          })
        );
        toast.success(res?.data?.message);
        navigate("/owner");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: ownerLoginSchema,
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
        <div className="w-full lg:flex">
          <div
            className="w-full h-auto lg:w-5/12 bg-gray-400 lg:bg-cover lg:bg-no-repeat lg:rounded-l-lg"
            style={{
              backgroundImage:
                "url('/images/meritt-thomas-HIEZBt6XRno-unsplash.jpg')",
            }}
          >
            <div className="h-full flex justify-center items-center lg:hidden">
              {/* Mobile view content */}
            </div>
          </div>
          <div className="w-full lg:w-7/12">
            <div className="flex justify-center items-center h-screen">
              <div className="w-full max-w-md lg:max-w-lg px-4">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Login</h2>
                  <p className="mt-2 text-sm">Please login to continue</p>
                </div>
                <div className="mt-6">
                  {/* <button className="flex items-center justify-center w-full py-2 rounded-full bg-white text-black hover:bg-gray-200 sm:py-3">
                    <img
                      src="https://freesvg.org/img/1534129544.png"
                      className="w-6 mr-2"
                      alt="Google Icon"
                    />
                    Sign in with Google
                  </button> */}
                  <OwnerGoogleLogin />
                </div>
                <fieldset className="mt-6 border-t border-gray-600">
                  <legend className="text-center text-sm">
                    Or login via our secure system
                  </legend>
                </fieldset>
                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 mt-1 leading-tight text-black bg-white rounded-full shadow placeholder-indigo-900 placeholder-opacity-30"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 mt-1 leading-tight text-black bg-white rounded-full shadow"
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-600">{errors.password}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember" className="ml-2 text-sm">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <Link
                        to="/owner/ownerForget"
                        className="text-sm hover:text-blue-500"
                      >
                        Forgot password ?
                      </Link>
                    </div>
                  </div>
                  <div className="mb-6">
                    <button className="w-full py-3 text-white bg-[#ff0808] hover:bg-[#ff4848] rounded-full">
                      Login
                    </button>
                  </div>
                  <div className="mt-3">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/owner/signup" className="text-blue-500">
                        Sign up
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

export default OwnerLogin;

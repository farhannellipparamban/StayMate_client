import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginVerification } from "../../api/userApi";
import { userLogin } from "../../reduxStore/slices/userSlice";
import { loginSchema } from "../../validations/user/loginValidation";
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserGoogleLogin from "../../assets/googleLogin/UserGoogleLogin";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  async function onSubmit() {
    try {
      setLoading(true);
      const res = await loginVerification(values);
      if (res?.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("userToken", token);
        dispatch(
          userLogin({
            token: token,
            user: user,
          })
        );
        toast.success(res?.data?.message);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-center items-center font-[sans-serif] text-[#333] h-full min-h-screen p-4">
          <div className="max-w-md w-full mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
            >
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold">Sign in</h3>
              </div>
              <div className="mb-6">
                <div className="relative flex flex-col">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-transparent text-sm border-b border-[#333] px-2 py-3 outline-none placeholder:text-[#333]"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <div className="relative flex flex-col">
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-transparent text-sm border-b border-[#333] px-2 py-3 outline-none placeholder:text-[#333]"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600 mt-1">{errors.password}</p>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#333"
                    stroke="#333"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    to="/forgetPassword"
                    className="text-sm font-semibold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#ff0808] hover:bg-[#ff4848] focus:outline-none"
                >
                  Sign in
                </button>
                <p className="text-sm text-center mt-6">
                  Don't have an account{" "}
                  <Link
                    to="/signup"
                    className="font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </div>
              <hr className="my-6 border-gray-500" />
              <div className="space-x-8 flex justify-center">
                <UserGoogleLogin />
                {/* <button type="button" className="border-none outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    fill="#000"
                    viewBox="0 0 22.773 22.773"
                  >
                    <path
                      d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
                <button type="button" className="border-none outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    fill="#007bff"
                    viewBox="0 0 167.657 167.657"
                  >
                    <path
                      d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                      data-original="#010002"
                    ></path>
                  </svg>
                </button> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLogin;

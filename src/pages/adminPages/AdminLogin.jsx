import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminVerifyLogin } from "../../api/adminApi";
import { adminLogin } from "../../reduxStore/slices/adminSlice";
import { useFormik } from "formik";
import { adminLoginSchema } from "../../validations/admin/adminLoginValidtion";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const res = await adminVerifyLogin(values);
      if (res?.status === 200) {
        const { token, userName } = res.data;
        localStorage.setItem("adminToken", token);
        dispatch(
          adminLogin({
            token: token,
            admin: userName,
          })
        );
        toast.success(res?.data?.message);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: adminLoginSchema,
      onSubmit,
    });
  return (
    <>
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl mt-11">
          <div className="md:w-1/2 px-5 mt-20">
            <h2 className="text-2xl font-bold text-[#002D74]">
              Admin Login now
            </h2>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Enter Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="off"
                  required
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
                {errors.password && touched.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>

              {/* <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div> */}

              <button
                type="submit"
                className="w-full block bg-[#ff0808] hover:bg-[#ff4848] focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            {/* <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div> */}

            {/* <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlink:href="#a" overflow="visible" />
                </clipPath>
                <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clip-path="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clip-path="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clip-path="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              <span className="ml-4">Login with Google</span>
            </button> */}

            {/* <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">
                Register
              </button>
            </div> */}
          </div>

          <div className="w-1/2 md:block hidden">
            <img
              src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
              className="rounded-2xl"
              alt="page img"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;

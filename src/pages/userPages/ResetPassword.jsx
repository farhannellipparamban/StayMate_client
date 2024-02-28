import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userResetPassword } from "../../api/userApi";
import { useFormik } from "formik";
import Loading from "../../components/loading/Loading";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .min(5, "Password Should Conatain 5-16 Characters")
      .max(16, "Password Should Conatain 5-16 Characters")
      .required("Required"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Required"),
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await userResetPassword(id, token, values.password);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        cpassword: "",
      },
      validationSchema: formSchema,
      onSubmit,
    });
  return (
    <>
      <UserNavbar />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <section className="bg-gray-200 py-10">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full md:max-w-2xl lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-400 dark:border-gray-200 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-dark">
                Change Password
              </h2>
              <form
                className="mt-4 space-y-4 lg:mt-5 sm:max-w-md"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="bg-gray-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-200 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="cpassword"
                    value={values.cpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-gray-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-300 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.cpassword && touched.cpassword && (
                    <p className="text-red-600">{errors.cpassword}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-600 rounded-full hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset password
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
      <UserFooter />
    </>
  );
};

export default ResetPassword;

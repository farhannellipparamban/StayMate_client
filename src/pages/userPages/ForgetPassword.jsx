import { useState } from "react";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userForgetPassword } from "../../api/userApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Loading from "../../components/loading/Loading";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await userForgetPassword(values.email);
      console.log(res);
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
        email: "",
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
        <div className="max-w-4xl mx-auto my-24">
          <div className="flex flex-col items-center justify-center p-4 space-y-4 antialiased text-gray-900">
            <div className="w-full px-4 md:px-8 max-w-lg space-y-6 bg-gray-200 rounded-3xl py-8 md:py-16">
              <h1 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold text-center">
                Don't worry
              </h1>
              <p className="text-sm md:text-base text-center mx-4 md:mx-12">
                We are here to help you recover your password. Enter the email
                address you used when you joined, and we'll send you
                instructions to reset your password.
              </p>
              <form
                className="space-y-4 md:space-y-6 w-full"
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm md:text-base font-medium text-center text-white bg-red-600 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                  >
                    Send
                  </button>
                </div>
              </form>
              <div className="text-xs md:text-sm text-gray-900 flex flex-col md:flex-row items-center justify-between">
                <p onClick={()=>navigate("/login")} className="text-gray-800 cursor-pointer hover:text-red-500 inline-flex items-center mb-2 md:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 md:h-5 w-4 md:w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <UserFooter />
    </>
  );
};

export default ForgetPassword;

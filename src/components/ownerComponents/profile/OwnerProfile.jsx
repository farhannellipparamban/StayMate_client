import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOwnerProfile } from "../../../api/ownerApi";
import { ownerLogin } from "../../../reduxStore/slices/ownerSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { profileValidationSchema } from "../../../validations/user/editProfileValidation";
import Loading from "../../loading/Loading";
import { getOwner } from "../../../api/chatApi";

const OwnerProfile = () => {
  const { owner } = useSelector((state) => state.ownerReducer);

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const ownerId = owner._id;

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await updateOwnerProfile({ ownerId, ...values });
      if (res?.status === 200) {
        setLoading(false);
        setIsEdit(false);
        dispatch(
            ownerLogin({
            owner: res?.data?.ownerData,
          })
        );
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: owner.name,
        email: owner.email,
        mobile: owner.mobile,
      },
      profileValidationSchema: profileValidationSchema,
      onSubmit,
      enableReinitialize: true,
    });

    useEffect(() => {
      getOwner(owner._id)
        .then((res) => {
          setUserData(res?.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
          <div className="rounded-xl w-full md:w-3/5 overflow-hidden bg-white shadow-lg">
            <div className="px-6 py-8">
              <div className="text-center">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-800">
                  Owner Profile
                </h1>
                <p className="text-gray-600 text-sm">
                  Edit your profile information
                </p>
              </div>
              <hr className="my-4" />
              {isEdit == false ? (
                <>
                  <div className="mt-4">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="firstName"
                      >
                        Name
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-md"
                        type="text"
                        id="firstName"
                        value={values.name}
                        disabled
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-md"
                        type="email"
                        id="email"
                        value={values.email}
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-md"
                        type="text"
                        id="phone"
                        value={values.mobile}
                        disabled
                      />
                    </div>
                    <div className="text-center">
                      <button
                        className="bg-[#ff0808] hover:bg-[#ff4848] text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4">
                    <div className="w-full">
                      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                        <div className="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="border rounded p-3 w-full text-slate-700"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.name && touched.name && (
                            <p className="text-red-600">{errors.name}</p>
                          )}
                        </div>
                        <div className="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            className="border rounded p-3 w-full text-slate-700"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email && (
                            <p className="text-red-600">{errors.email}</p>
                          )}
                        </div>
                        <div className="mt-5 overflow-hidden text-sm">
                          <label
                            htmlFor="roomName"
                            className="block text-sm font-medium py-2 ms-2 text-gray-600"
                          >
                            Phone
                          </label>
                          <input
                            type="number"
                            name="number"
                            className="border rounded p-3 w-full text-slate-700"
                            value={values.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.mobile && touched.mobile && (
                            <p className="text-red-600">{errors.mobile}</p>
                          )}
                        </div>
                        <div className="mt-5 text-sm">
                          <button
                            type="submit"
                            className="text-white w-full bg-[#ff0808] hover:bg-[#ff4848] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerProfile;

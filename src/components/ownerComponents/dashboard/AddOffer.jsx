import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyRoomsList, addOffer } from "../../../api/ownerApi";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import Loading from "../../loading/Loading";

const AddOffer = () => {
  const { _id } = useSelector((state) => state.ownerReducer.owner);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const ownerId = _id;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    MyRoomsList(ownerId)
      .then((res) => {
        setLoading(false);
        setRooms(res?.data?.rooms);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);
  const onSubmit = async () => {
    try {
      const res = await addOffer(values);
      if (res.status === 201) {
        navigate("/owner/offerList");
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
        rooms: [],
        offerName:"",
        percentage: "",
        startDate: "",
        expiryDate: "",
      },
      onSubmit,
    });
  return (
    <>
      <div className="w-full md:w-4/4 px-4 mb-5 mt-5">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-300">
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : (
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-full">
                  <label
                    htmlFor="offerName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Offer Name:
                  </label>
                  <input
                    type="text"
                    id="offerName"
                    name="offerName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.offerName}
                    required
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {touched.offerName && errors.offerName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.offerName}
                    </p>
                  )}
                </div>
                <div className="sm:flex sm:space-x-6">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="rooms"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Rooms:
                    </label>
                    <select
                      id="rooms"
                      name="rooms"
                      onChange={handleChange}
                      value={values.rooms}
                      // multiple
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select a room</option>

                      {rooms.map((room, index) => (
                        <option key={index} value={room.roomName}>
                          {room.roomName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="percentage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Percentage:
                    </label>
                    <input
                      type="number"
                      id="percentage"
                      name="percentage"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.percentage}
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {touched.percentage && errors.percentage && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.percentage}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:flex sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.startDate}
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="expiryDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiry Date:
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.expiryDate}
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                >
                  Add Offer
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddOffer;

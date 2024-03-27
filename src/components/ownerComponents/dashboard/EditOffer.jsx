import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MyRoomsList,
  editOffer,
  editOfferDetails,
} from "../../../api/ownerApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Loading from "../../loading/Loading";
import { useSelector } from "react-redux";

const EditOffer = () => {
  const [offers, setOffers] = useState({});
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { offerId } = useParams();
  const { _id } = useSelector((state) => state.ownerReducer.owner);
  const ownerId = _id;

  useEffect(() => {
    editOfferDetails(offerId)
      .then((res) => {
        setOffers(res?.data?.offer);
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    MyRoomsList(ownerId)
      .then((res) => {
        setLoading(false);
        setRooms(res?.data?.rooms);
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [ownerId]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await editOffer({ ...values, offerId });
      console.log(res);
      if (res?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        navigate("/owner/offerList");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        rooms: offers.rooms || [],
        offerName: offers.offerName,
        percentage: offers.percentage,
        startDate: offers.startDate
          ? new Date(offers.startDate).toISOString().split("T")[0]
          : "",
        expiryDate: offers.expiryDate
          ? new Date(offers.expiryDate).toISOString().split("T")[0]
          : "",
      },
      onSubmit,
      enableReinitialize: true,
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
                    {touched.startDate && errors.startDate && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.startDate}
                      </p>
                    )}
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
                    {touched.expiryDate && errors.expiryDate && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditOffer;

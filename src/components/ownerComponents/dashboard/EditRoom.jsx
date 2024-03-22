import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteSingleImage,
  editRoom,
  editRoomDetails,
} from "../../../api/ownerApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { roomValidation } from "../../../validations/owner/roomValidation";
import Loading from "../../loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useGoogleMapApi from "../../coustomHook/useGoogleMapApi";
import { Autocomplete } from "@react-google-maps/api";

const EditRoom = () => {
  const { isLoaded } = useGoogleMapApi();
  const [room, setRoom] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [roomImagesError, setRoomImagesError] = useState(null);
  const [roomImage, setRoomImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const navigate = useNavigate();
  const { roomId } = useParams();

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (!location.trim()) {
        setErrorLocation("Location required");
        return;
      }
      if (room.roomImages.length === 0 && roomImage.length === 0) {
        setRoomImagesError("Please select at least one image for the room.");
        setLoading(false);
        return;
      }
      const res = await editRoom({
        ...values,
        roomImage,
        roomId,
        location,
      });
      if (res?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        navigate("/owner/roomList");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    editRoomDetails(roomId)
      .then((res) => {
        setRoom(res?.data?.room);
        setLocation(res?.data?.room?.location);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        roomName: room.roomName,
        rent: room.rent,
        mobile: room.mobile,
        description: room.description,
        roomType: room.roomType,
        model: room.model,
        acType: room.acType,
        capacity: room.capacity,
      },
      validationSchema: roomValidation,
      onSubmit,
      enableReinitialize: true,
    });

  const handleRoomImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (file) =>
        file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
    );
    if (isValid) {
      setRoomImageToBase(files);
      setRoomImagesError(null);
    } else {
      setRoomImagesError("Invalid file type. Please select valid image files.");
      setRoomImage([]);

      event.target.value = null;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    const allImages = [...newImages, ...room.roomImages];
    setSelectedImages(allImages);
  };

  const setRoomImageToBase = async (files) => {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        setRoomImage((prev) => [...prev, reader.result]);
      };
    }
  };

  const handleDeleteImage = async (imageSrc) => {
    try {
      setLoading(true);
      const res = await deleteSingleImage(imageSrc, room._id);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        setRoom(res?.data?.updatedData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("location"),
        {
          componentRestrictions: { country: "IN" },
          types: ["(cities)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const firstName = place.formatted_address.split(",")[0];
        setLocation(firstName);
        setErrorLocation("");
      });
    }
  }, [isLoaded]);
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-4/5 w-full bg-gray-100 py-10">
          <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 p-8 bg-white rounded-lg shadow-lg mt-3 mb-3">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              Edit Room
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="roomName"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Room Name
                  </label>
                  <input
                    type="text"
                    id="roomName"
                    name="roomName"
                    value={values.roomName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-full"
                  />
                  {touched.roomName && errors.roomName && (
                    <p className="text-red-600">{errors.roomName}</p>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Capacity
                  </label>
                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={values.capacity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {touched.capacity && errors.capacity && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.capacity}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-8 flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="roomType"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Room Category
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={values.roomType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="" label="Select Room Type">
                      Select Room Type
                    </option>
                    <option value="Single Room" label="Single Room" />
                    <option value="Double Room" label="Double Room" />
                    <option value="Family Room" label="Family Room" />
                    <option value="Deluxe Room" label="Deluxe Room" />
                    <option
                      value="Presidential Suite"
                      label="Presidential Suite"
                    />
                    <option value="Hollywood Twin" label="Hollywood Twin" />
                  </select>
                  {touched.roomType && errors.roomType && (
                    <p className="text-red-600">{errors.roomType}</p>
                  )}
                </div>

                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Model
                  </label>
                  <select
                    id="model"
                    name="model"
                    value={values.model}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    {/* <option value="" disabled>
                  Select Model
                </option>
                <option value="Normal">Normal</option>
                <option value="Medium">Medium</option>
                <option value="Luxury">Luxury</option> */}
                    <option value="" label="Select Room Type" />
                    <option value="Normal" label="Normal" />
                    <option value="Medium" label="Medium" />
                    <option value="Luxury" label="Luxury" />
                  </select>
                  {touched.model && errors.model && (
                    <p className="text-red-600">{errors.model}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  AC Type
                </label>
                <div className="mt-1 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      id="acYes"
                      name="acType"
                      value="AC"
                      checked={values.acType === "AC"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-slate-700"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Available
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      id="acNo"
                      name="acType"
                      value="Non-AC"
                      checked={values.acType === "Non-AC"}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-slate-700"
                    />
                    <span className="ml-2 text-sm text-gray-700">Non-AC</span>
                  </label>
                </div>
                {touched.acType && errors.acType && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.acType}
                  </div>
                )}
              </div>

              {/* Add more form fields */}

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                />
                {touched.description && errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                {isLoaded && (
                  <Autocomplete>
                    <input
                      type="search"
                      id="location"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md border-gray-400"
                      required=""
                    />
                  </Autocomplete>
                )}

                {errorLocation && (
                  <div className="text-red-500 text-sm">{errorLocation}</div>
                )}
              </div>

              <div className="flex">
                <div className="mb-4 me-1 w-1/2">
                  <label
                    htmlFor="rent"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Room Rent
                  </label>
                  <input
                    type="number"
                    id="rent"
                    name="rent"
                    value={values.rent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {touched.rent && errors.rent && (
                    <p className="text-red-500 text-sm mt-1">{errors.rent}</p>
                  )}
                </div>
                <div className="mb-4 ms-1 w-1/2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  {touched.mobile && errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>
              </div>

              {/* Add other form fields similarly */}

              <div className="mb-4 relative">
                <label
                  htmlFor="file_input"
                  className="block text-sm font-medium text-gray-600"
                >
                  Upload Room Images
                </label>
                <div className="mt-3 flex items-center">
                  <label className="cursor-pointer bg-black text-white p-1 text-sm px-2 rounded-md hover:bg-gray-800 transition duration-300">
                    Choose File
                    <input
                      type="file"
                      id="file_input"
                      accept="image/*"
                      multiple
                      onChange={handleRoomImagesChange}
                      className="hidden"
                    />
                  </label>
                  <span className="ml-2">
                    {roomImage.length} file(s) selected
                  </span>
                </div>
                {roomImagesError && (
                  <p className="text-red-500 text-sm mt-1">{roomImagesError}</p>
                )}
                <div className="w-60 h-auto overflow-x-auto flex space-x-2">
                  {selectedImages.length > 0
                    ? selectedImages.map((imageURL, index) => (
                        <div key={index}>
                          <img
                            src={imageURL}
                            alt={`Room Image ${index + 1}`}
                            className="max-w-full h-auto"
                          />
                        </div>
                      ))
                    : room.roomImages &&
                      room.roomImages.map((imageURL, index) => (
                        <div key={index}>
                          <img
                            src={imageURL}
                            alt={`Room Image ${index + 1}`}
                            className="max-w-full h-auto"
                          />
                          <p onClick={() => handleDeleteImage(imageURL)}>
                            <FontAwesomeIcon
                              className="w-5 h-5"
                              icon={faTrash}
                              style={{ color: "#e70d23" }}
                            />
                          </p>
                        </div>
                      ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditRoom;

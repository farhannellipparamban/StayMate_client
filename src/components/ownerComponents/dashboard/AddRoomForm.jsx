import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addRooms } from "../../../api/ownerApi";
import { roomValidation } from "../../../validations/owner/roomValidation";
import { useFormik } from "formik";
import useGoogleMapApi from "../../coustomHook/useGoogleMapApi";
import { Autocomplete } from "@react-google-maps/api";
import CroppedImages from "./CroppedImages";
import "./Crop.css";

const AddRoomForm = () => {
  const { isLoaded } = useGoogleMapApi();
  const inputRef = useRef();
  const [roomImage, setRoomImage] = useState([]);
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState([]);
  // const [roomImages, setRoomImages] = useState([]);
  const [roomImagesError, setRoomImagesError] = useState(null);
  const [location, setLocation] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.ownerReducer.owner);
  const ownerId = _id;
  const onChooseImg = () => {
    inputRef.current.click();
  };
  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = roomImage;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      const dataURl = canvasEle.toDataURL("image/jpeg");
      setImgAfterCrop((prevArray) => [...prevArray, dataURl]);
      setCurrentPage("img-cropped");
    };
  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setRoomImage("");
  };
  // const onSelectedImage = (selectedImage) => {};

  const onSubmit = async () => {
    try {
      if (!location.trim()) {
        setErrorLocation("Location required");
        return;
      }
      if (imgAfterCrop.length === 0) {
        setRoomImagesError("Please select at least one image for the room. ");
        return;
      }
      const res = await addRooms(
        { ...values },
        imgAfterCrop,
        location,
        ownerId
      );
      console.log(res);
      if (res?.status === 201) {
        navigate("/owner", { state: { ownerId: ownerId } });
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
        roomName: "",
        rent: "",
        mobile: "",
        description: "",
        roomType: "",
        model: "",
        acType: "",
      },
      validationSchema: roomValidation,
      onSubmit,
    });

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        setRoomImage(reader.result);
        setCurrentPage("crop-img");
        const isValid = files.every(
          (files) =>
            files.type.startsWith("image/jpeg") ||
            files.type.startsWith("image/png")
        );
        if (isValid) {
          setRoomImageToBase(files);
          setRoomImagesError(null);
        } else {
          setRoomImagesError(
            "Invalid files type. Please select valid image files."
          );
        }
        setRoomImage([]);
        event.target.value = null;
      };
    }
  };
  const handleRoomImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (files) =>
        files.type.startsWith("image/jpeg") ||
        files.type.startsWith("image/png")
    );
    if (isValid) {
      setRoomImageToBase(files);
      setRoomImagesError(null);
    } else {
      setRoomImagesError(
        "Invalid files type. Please select valid image files."
      );
    }
    setRoomImage([]);
    event.target.value = null;
  };

  const setRoomImageToBase = async (files) => {
    const imagesData = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        imagesData.push(reader.result);
        // setRoomImage((prev) => [...prev, reader.result]);
        if (imagesData.length === files.length) {
          setRoomImage(imagesData);
        }
      };
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
      <div className="flex justify-center items-center h-4/5 w-full bg-gray-100 py-10">
        <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 p-8 bg-white rounded-lg shadow-lg mt-3 mb-3">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Add Room Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="roomName" className="font-medium text-gray-600">
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                name="roomName"
                value={values.roomName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {touched.roomName && errors.roomName && (
                <p className="text-red-600">{errors.roomName}</p>
              )}
            </div>

            <div className="mb-4">
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="" label="Select Room Type">
                  Select Room Type
                </option>
                <option value="Single Room" label="Single Room" />
                <option value="Double Room" label="Double Room" />
                <option value="Family Room" label="Family Room" />
                <option value="Deluxe Room" label="Deluxe Room" />
                <option value="Presidential Suite" label="Presidential Suite" />
                <option value="Hollywood Twin" label="Hollywood Twin" />
              </select>
              {touched.roomType && errors.roomType && (
                <p className="text-red-600">{errors.roomType}</p>
              )}
            </div>

            <div className="mb-4">
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
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
                    className="form-radio h-4 w-4 text-slate-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Available</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="acNo"
                    name="acType"
                    value="Non-AC"
                    checked={values.acType === "Non-AC"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-slate-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Non-AC</span>
                </label>
              </div>
              {touched.acType && errors.acType && (
                <div className="text-red-500 text-sm mt-1">{errors.acType}</div>
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
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
                    className="mt-1 p-2 w-full border rounded-md"
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
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
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
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
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
              <button className="btn" onClick={onChooseImg}>
                Choose File{" "}
              </button>
              {/* </label> */}
              <span className="ml-2">{roomImage.length} file(s) selected</span>
              <div className="mt-3 flex items-center">
                {/* <label className="cursor-pointer bg-black text-white p-1 text-sm px-2 rounded-md hover:bg-gray-800 transition duration-300"> */}
                {/* Choose File */}

                {currentPage === "choose-img" && (
                  <input
                    type="file"
                    id="file_input"
                    accept="image/*"
                    multiple
                    ref={inputRef}
                    onChange={handleOnChange}
                    className="hidden"
                    style={{ display: "none" }}
                  />
                )}
                {currentPage === "crop-img" ? (
                  <CroppedImages
                    roomImage={roomImage}
                    onCropDone={onCropDone}
                    onCropCancel={onCropCancel}
                  />
                ) : (
                  <div>
                    <div>
                      <img src={imgAfterCrop} className="cropped-img" alt="" />
                    </div>
                    <button
                      onClick={() => setCurrentPage("crop-img")}
                      className="btn"
                    >
                      Crop
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage("choose-img");
                        setRoomImage("");
                      }}
                      className="btn"
                    >
                      New Image
                    </button>
                  </div>
                )}
              </div>

              {imgAfterCrop.length > 0 && (
                <div className="mt-3 flex overflow-x-auto">
                  {imgAfterCrop.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Room Image ${index + 1}`}
                      className="w-32 h-32 mr-2 mb-2 object-cover rounded-md flex-shrink-0"
                    />
                  ))}
                </div>
              )}

              {roomImagesError && (
                <p className="text-red-500">{roomImagesError}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 w-full"
            >
              Add Room
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRoomForm;

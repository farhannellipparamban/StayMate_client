import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPhone } from "@fortawesome/free-solid-svg-icons";
import ReactImageMagnify from "react-image-magnify";

const RoomDetails = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const { loading, setLoading } = useState(false);
  const { state } = useLocation();
  const { room, values } = state;
  console.log(state);
  const navigate = useNavigate();
  const imageUrl = room?.roomImages[imageIndex];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 p-4 md:p-8 lg:p-12 xl:p-16 font-serif">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {/* Single large image */}
                {/* <img
                  src={room?.roomImages[imageIndex]}
                  alt="Property Image"
                  className="w-full h-auto rounded-md shadow-lg mb-4 object-cover  hover:scale-105 transition duration-500 cursor-pointer"
                /> */}
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Property Image",
                      isFluidWidth: true,
                      src: imageUrl, // Set the image URL here
                      style: {
                        width: "300px", // Customize the width of the small image
                        height: "auto", // Auto adjust the height
                        border: "1px solid #ccc", // Add a border to the small image
                        borderRadius: "8px", // Apply border radius
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Apply box shadow
                      },
                    },
                    largeImage: {
                      src: imageUrl, // Set the image URL here
                      width: 1200,
                      height: 1800,
                      style: {
                        width: "800px", // Customize the width of the large image
                        height: "auto", // Auto adjust the height
                      },
                    },
                  }}
                  className="w-full h-auto rounded-md shadow-lg mb-4 object-cover " // Apply a CSS class to the component
                />

                {/* Carousel with three small images in a line */}
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {room?.roomImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-44 h-32 hover:scale-125 transition duration-500 cursor-pointer max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-md shadow-lg object-cover mb-5"
                      onClick={() => setImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="px-7 py-6 border-2 border-gray-200 shadow-lg">
                {/* Room name */}
                <div className="py-6 px-4">
                  <h2 className="text-3xl font-bold mb-6">{room?.roomName}</h2>
                  <h3 className="text-sm font-semibold mb-4">
                    Owner : {room?.ownerId.name}
                  </h3>
                  <p className="text-sm font-semibold font-sans mb-2 ">
                    <FontAwesomeIcon icon={faPhone} /> Mobile : +91{" "}
                    {room?.mobile}
                  </p>

                  <div className="mt-2 flex">
                    {/* Wishlist icon */}
                    <span className="text-3xl text-red-500 cursor-pointer inline-block mt-1">
                      <FontAwesomeIcon icon={faHeart} />{" "}
                      <span className="text-lg text-red-500 font-serif font-bold cursor-pointer inline-block my-4">
                        Add to WishList
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-10">
                    <span className="text-red-600 font-bold text-xl">
                      ₹ {room?.rent} Per Night
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Taxes and fees not included
                    </p>
                  </h3>
                </div>
                <form action="">
                  <div className="w-full border-b-2 border-b-red-400 my-2 mt-8">
                    {/* <div className="flex mt-16">
                      <div className="w-1/2 pr-2">
                        <label
                          htmlFor="check-in-date"
                          className="block text-sm font-medium text-gray-900 dark:text-gray-600"
                        >
                          Check In Date
                        </label>
                        <input
                          type="date"
                          id="CheckInDate"
                          name="CheckInDate"
                          className="mt-1 p-2 border mb-3 bg-green-50 text-black rounded-md focus:outline-none focus:border-white"
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <label
                          htmlFor="check-out-date"
                          className="block text-sm font-medium text-gray-900 dark:text-gray-600"
                        >
                          Check Out Date
                        </label>
                        <input
                          type="date"
                          id="CheckOutDate"
                          name="CheckOutDate"
                          className="mt-1 p-2 border mb-3 bg-green-50 text-black rounded-md focus:outline-none focus:border-white"
                        />
                      </div>
                    </div> */}
                    <div className="mb-4 font-bold">
                      <p className="text-xl mb-4">
                        Location :{" "}
                        <span className="text-lg font-extralight">
                          {room?.location}
                        </span>
                      </p>
                      <p className="text-xl mb-4">
                        Room Type :{" "}
                        <span className="text-lg font-extralight">
                          {" "}
                          {room?.roomType}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Continue to booking button */}
                  <button
                    onClick={() =>
                      navigate("/checkOut", { state: { room, values } })
                    }
                    className="mt-14 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-800 transition duration-300 ease-in-out"
                  >
                    Book Now
                  </button>
                </form>
              </div>
              <div className="md:col-span-2">
                {/* Category */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold mb-10">
                    {room?.model} Suite
                  </h3>
                </div>

                {/* Amenities */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">Amenities</h3>
                  <p className="list-disc list-inside text-gray-700">
                    {room?.acType}
                  </p>
                </div>
                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold mb-10">
                    Description : {""}
                    <span className="text-gray-700 text-lg font-serif leading-relaxed">
                      {room?.description}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetails;

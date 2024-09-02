import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPhone } from "@fortawesome/free-solid-svg-icons";
import { checkRoomAvailability } from "../../../api/userApi";
import { toast } from "react-toastify";
import RatingList from "../rating/RatingList";

const RoomDetails = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const { room, values, offers } = state;

  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState({
    startDate: values.CheckInDate,
    endDate: values.CheckOutDate,
  });
  const [isRoomAvailable, setIsRoomAvailable] = useState(false);
  // const imageUrl = room?.roomImages[imageIndex];

  useEffect(() => {
    const checkAvailability = async () => {
      if (
        selectedDates.startDate &&
        selectedDates.endDate &&
        state?.room?._id
      ) {
        try {
          const res = await checkRoomAvailability(
            state.room._id,
            selectedDates.startDate,
            selectedDates.endDate
          );
          if (res?.status === 200) {
            setIsRoomAvailable(res.data.available);
          }
        } catch (error) {
          console.error("Error checking room availability:", error);
        }
      }
    };

    checkAvailability();
  }, [selectedDates, state?.room?._id]);

  const handleBookNow = () => {
    navigate("/checkOut", {
      state: { room: state.room, values: state.values, offers: state.offers },
    });
  };
  const roomOffer = offers.find((offer) => offer.rooms === room.roomName);

  const discountedRent =
    roomOffer && roomOffer.percentage
      ? room.rent - (room.rent * roomOffer.percentage) / 100
      : room.rent;

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
                <img
                  src={room?.roomImages[imageIndex]}
                  alt="Property Image"
                  className="w-full h-auto rounded-md shadow-lg mb-4 object-cover  hover:scale-105 transition duration-500 cursor-pointer"
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

                  <h3 className="mt-12 mb-6">
                    <span className="text-red-600 font-bold text-xl">
                      ₹ {discountedRent} Per Night
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Taxes and fees not included
                    </p>
                  </h3>
                  <div className="font-bold">
                    <p className="text-xl mb-4">
                      Capacity :{" "}
                      <span className="text-lg font-extralight">
                        {room?.capacity}
                      </span>
                    </p>
                    <p className="text-xl mb-4">
                      Location :{" "}
                      <span className="text-lg font-extralight">
                        {room?.location}
                      </span>
                    </p>
                    <p className="text-xl">
                      Room Type :{" "}
                      <span className="text-lg font-extralight">
                        {" "}
                        {room?.roomType}
                      </span>
                    </p>
                  </div>
                </div>
                <form>
                  <div className="w-full border-b-2 border-b-red-400 my-2"></div>
                  <div className="mt-2 flex">
                    {/* Wishlist icon */}
                    <span className="text-3xl text-red-500 cursor-pointer inline-block mt-6 mr-4">
                      <FontAwesomeIcon icon={faHeart} className="mr-1" />{" "}
                      <span className="text-lg text-red-500 font-serif font-bold cursor-pointer inline-block">
                        Add to WishList
                      </span>
                    </span>
                  </div>
                  {!isRoomAvailable && (
                    <button
                      onClick={handleBookNow}
                      className="mt-10 md:mt-10 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-800 transition duration-300 ease-in-out"
                    >
                      Book Now
                    </button>
                  )}

                  {/* Continue to booking button */}
                  {/* <button
                      type="submit"
                      onClick={() =>
                        navigate("/checkOut", { state: { room, values } })
                      }
                      className="mt-10 md:mt-10 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-800 transition duration-300 ease-in-out"
                    >
                      Book Now
                    </button> */}
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
          <RatingList />
        </div>
      )}
    </>
  );
};

export default RoomDetails;

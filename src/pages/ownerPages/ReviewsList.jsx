import React, { useEffect, useState } from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerSidebar from "../../components/ownerComponents/dashboard/OwnerSidebar";
import ReviewList from "../../components/ownerComponents/dashboard/bookings/ReviewList";
import { useLocation } from "react-router-dom";
import { getAllReviews } from "../../api/ownerApi";
const ReviewsList = () => {
  const { state } = useLocation();
  const [roomData, setRoomData] = useState({});
  const { room } = state;

  useEffect(() => {
    getAllReviews(room._id)
      .then((res) => {
        setRoomData(res?.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex mt-5">
        <OwnerSidebar />
        <ReviewList room={roomData.roomData} />
      </div>
    </>
  );
};

export default ReviewsList;

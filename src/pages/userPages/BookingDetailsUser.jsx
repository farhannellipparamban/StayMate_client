import React, { useState } from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import DetailsUser from "../../components/userComponents/Booking/DetailsUser";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";
import { useLocation } from "react-router-dom";

const BookingDetailsUser = () => {
    const { state } = useLocation();
    const { data } = state;
    const [bookingData] = useState(data);
  return (
    <>
      <UserNavbar />
      <div className="md:mx-10 mx-auto mt-10 pb-40">
        <DetailsUser bookingData={bookingData} />
      </div>
      <UserFooter />
    </>
  );
};

export default BookingDetailsUser;

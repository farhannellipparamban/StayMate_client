import React from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import BookingList from "../../components/userComponents/Booking/BookingList";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";
import { cancelBookingUser, myBookings } from "../../api/userApi";
import { useSelector } from "react-redux";

const BookingListPage = () => {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <>
      <UserNavbar />
      <BookingList
        id={user._id}
        BookingListPage={myBookings}
        cancelBooking={cancelBookingUser}
        role="user"
      />
      <UserFooter />
    </>
  );
};

export default BookingListPage;

import React from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import BookingList from "../../components/userComponents/Booking/BookingList";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";
import { myBookings } from "../../api/userApi";
import { useSelector } from "react-redux";

const BookingListPage = () => {
  
  const { user } = useSelector((state) => state.userReducer);
  console.log(user);
  return (
    <>
      <UserNavbar />
      <BookingList id={user._id} BookingListPage={myBookings} />
      <UserFooter />
    </>
  );
};

export default BookingListPage;

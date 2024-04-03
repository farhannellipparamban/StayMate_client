import React from "react";
import { Route, Routes } from "react-router-dom";
import UserHome from "../pages/userPages/UserHome";
import UserSignup from "../pages/userPages/UserSignup";
import UserLogin from "../pages/userPages/UserLogin";
import Otp from "../pages/userPages/Otp";
import ProfilePage from "../pages/userPages/ProfilePage";
import AllRoomsPage from "../pages/userPages/AllRoomsPage";
import RoomDetailsPage from "../pages/userPages/RoomDetailsPage";
import UserProtect from "./userPrivate/UserProtect";
import UserPublic from "./userPrivate/UserPublic";
import UserContactPage from "../pages/userPages/UserContactPage";
import ForgetPassword from "../pages/userPages/ForgetPassword";
import ResetPassword from "../pages/userPages/ResetPassword";
import CheckOutPage from "../pages/userPages/CheckOutPage";
import BookingSuccessPage from "../pages/userPages/BookingSuccessPage";
import BookingListPage from "../pages/userPages/BookingListPage";
import BookingDetailsUser from "../pages/userPages/BookingDetailsUser";
import WalletHistoryPage from "../pages/userPages/WalletHistoryPage";
import UserAboutPage from "../pages/userPages/UserAboutPage";
import Error404 from "../components/error/Error404";
import Error500 from "../components/error/Error500";
import ChatPage from "../pages/userPages/ChatPage";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/contact" element={<UserContactPage />} />
      <Route path="/about" element={<UserAboutPage />} />
      <Route path="/allRooms" element={<AllRoomsPage />} />
      <Route path="/roomDetails" element={<RoomDetailsPage />} />
      <Route
        path="/signup"
        element={
          <UserPublic>
            <UserSignup />
          </UserPublic>
        }
      />
      <Route
        path="/otp"
        element={
          <UserPublic>
            <Otp />
          </UserPublic>
        }
      />
      <Route
        path="/login"
        element={
          <UserPublic>
            <UserLogin />
          </UserPublic>
        }
      />
      <Route
        path="/forgetPassword"
        element={
          <UserPublic>
            <ForgetPassword />
          </UserPublic>
        }
      />
      <Route
        path="/resetPassword/:id/:token"
        element={
          <UserPublic>
            <ResetPassword />
          </UserPublic>
        }
      />

      <Route
        path="/profile"
        element={
          <UserProtect>
            <ProfilePage />
          </UserProtect>
        }
      />
      <Route
        path="/checkOut"
        element={
          <UserProtect>
            <CheckOutPage />
          </UserProtect>
        }
      />
      <Route
        path="/bookingSuccess"
        element={
          <UserProtect>
            <BookingSuccessPage />
          </UserProtect>
        }
      />
      <Route
        path="/bookingList"
        element={
          <UserProtect>
            <BookingListPage />
          </UserProtect>
        }
      />
      <Route
        path="/bookingDetails"
        element={
          <UserProtect>
            <BookingDetailsUser />
          </UserProtect>
        }
      />
      <Route
        path="/walletHistory"
        element={
          <UserProtect>
            <WalletHistoryPage />
          </UserProtect>
        }
      />
      <Route
        path="/chat"
        element={
          <UserProtect>
            <ChatPage />
          </UserProtect>
        }
      />

      <Route path="*" element={<Error404 />} />
      <Route path="/pageNotFound" element={<Error404 />} />
      <Route path="/error-500" element={<Error500 />} />
    </Routes>
  );
};

export default UserRoute;

import React from "react";
import { Route, Routes } from "react-router-dom";
import OwnerSignup from "../pages/ownerPages/OwnerSignup";
import OwnerLogin from "../pages/ownerPages/OwnerLogin";
import OwnerHome from "../pages/ownerPages/OwnerHome";
import OwnerOtp from "../pages/ownerPages/OwnerOtp";
import OwnerProfilePage from "../pages/ownerPages/OwnerProfilePage";
import OwnerDashboard from "../pages/ownerPages/OwnerDashboard";
import AddRoomPage from "../pages/ownerPages/AddRoomPage";
import RoomListPage from "../pages/ownerPages/RoomListPage";
import EditRoomPage from "../pages/ownerPages/EditRoomPage";
import CustomersListPage from "../pages/ownerPages/CustomersListPage";
import OwnerPublic from "./ownerPrivate/OwnerPublic";
import OwnerProtect from "./ownerPrivate/OwnerProtect";
import OwnerContactPage from "../pages/ownerPages/OwnerContactPage";
import OwnerForgetPass from "../pages/ownerPages/OwnerForgetPass";
import OwnerResetPass from "../pages/ownerPages/OwnerResetPass";

const OwnerRoute = () => {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <OwnerPublic>
            <OwnerSignup />
          </OwnerPublic>
        }
      />
      <Route
        path="/otp"
        element={
          <OwnerPublic>
            <OwnerOtp />
          </OwnerPublic>
        }
      />
      <Route
        path="/login"
        element={
          <OwnerPublic>
            <OwnerLogin />
          </OwnerPublic>
        }
      />
      <Route
        path="/ownerForget"
        element={
          <OwnerPublic>
            <OwnerForgetPass />
          </OwnerPublic>
        }
      />
      <Route
        path="/ownerResetPass/:id/:token"
        element={
          <OwnerPublic>
            <OwnerResetPass />
          </OwnerPublic>
        }
      />
      <Route
        path="/"
        element={
          <OwnerProtect>
            <OwnerHome />
          </OwnerProtect>
        }
      />
      <Route path="/contact" element={<OwnerContactPage />} />
      <Route
        path="/dashboard"
        element={
          <OwnerProtect>
            <OwnerDashboard />
          </OwnerProtect>
        }
      />
      <Route
        path="/addRoom"
        element={
          <OwnerProtect>
            <AddRoomPage />
          </OwnerProtect>
        }
      />
      <Route
        path="/roomList"
        element={
          <OwnerProtect>
            <RoomListPage />
          </OwnerProtect>
        }
      />
      <Route
        path="/editRoom/:roomId"
        element={
          <OwnerProtect>
            <EditRoomPage />
          </OwnerProtect>
        }
      />
      <Route
        path="/customers"
        element={
          <OwnerProtect>
            <CustomersListPage />
          </OwnerProtect>
        }
      />
      <Route
        path="/profile"
        element={
          <OwnerProtect>
            <OwnerProfilePage />
          </OwnerProtect>
        }
      />
    </Routes>
  );
};

export default OwnerRoute;

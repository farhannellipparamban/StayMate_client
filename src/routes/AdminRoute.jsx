import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/adminPages/AdminLogin";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import UserListPage from "../pages/adminPages/UserListPage";
import OwnerListPage from "../pages/adminPages/OwnerListPage";
import AdminRoomListPage from "../pages/adminPages/AdminRoomListPage";
import RoomDetailsPage from "../pages/adminPages/RoomDetailsPage";
import AdminPublic from "./adminPrivate/AdminPublic";
import AdminProtect from "./adminPrivate/AdminProtect";

const AdminRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminPublic>
            <AdminLogin />
          </AdminPublic>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AdminProtect>
            <AdminDashboard />
          </AdminProtect>
        }
      />
      <Route
        path="/userList"
        element={
          <AdminProtect>
            <UserListPage />
          </AdminProtect>
        }
      />
      <Route
        path="/ownerList"
        element={
          <AdminProtect>
            <OwnerListPage />
          </AdminProtect>
        }
      />
      <Route
        path="/roomList"
        element={
          <AdminProtect>
            <AdminRoomListPage />
          </AdminProtect>
        }
      />
      <Route
        path="/roomDetails/:roomId"
        element={
          <AdminProtect>
            <RoomDetailsPage />
          </AdminProtect>
        }
      />
    </Routes>
  );
};

export default AdminRoute;

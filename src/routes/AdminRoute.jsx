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
import RoomAddReqPage from "../pages/adminPages/RoomAddReqPage";
import Error404 from "../components/error/Error404";
import Error500 from "../components/error/Error500";

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
      <Route
        path="/roomAddRequests"
        element={
          <AdminProtect>
            <RoomAddReqPage />
          </AdminProtect>
        }
      />
      <Route path="*" element={<Error404 />} />
      <Route path="/pageNotFound" element={<Error404 />} />
      <Route path="/error-500" element={<Error500 />} />
    </Routes>
  );
};

export default AdminRoute;

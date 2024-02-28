import React from "react";
import AdminNavbar from "../../components/adminCoponents/AdminNavbar";
import AdminSidebar from "../../components/adminCoponents/AdminSidebar";
import RoomDetails from "../../components/adminCoponents/RoomDetails";

const RoomDetailsPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto flex w-full">
        <AdminSidebar />
        <RoomDetails />
      </div>
    </>
  );
};

export default RoomDetailsPage;

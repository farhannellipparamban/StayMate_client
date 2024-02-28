import React from "react";
import AdminNavbar from "../../components/adminCoponents/AdminNavbar";
import AdminSidebar from "../../components/adminCoponents/AdminSidebar";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex">
        <AdminSidebar />
      </div>
    </>
  );
};

export default AdminDashboard;

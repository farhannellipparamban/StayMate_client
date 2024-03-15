import React from "react";
import AdminNavbar from "../../components/adminCoponents/AdminNavbar";
import AdminSidebar from "../../components/adminCoponents/AdminSidebar";
import DashboardAdmin from "../../components/adminCoponents/dashboard/DashboardAdmin";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex">
        <AdminSidebar />
        <DashboardAdmin />
      </div>
    </>
  );
};

export default AdminDashboard;

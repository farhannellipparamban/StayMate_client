import React from "react";
import AdminNavbar from "../../components/adminCoponents/AdminNavbar";
import AdminSidebar from "../../components/adminCoponents/AdminSidebar";
import OwnerList from "../../components/adminCoponents/OwnerList";

const OwnerListPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex">
        <AdminSidebar />
        <OwnerList />
      </div>
    </>
  );
};

export default OwnerListPage;

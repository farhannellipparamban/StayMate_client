import React from "react";
import AdminNavbar from "../../components/adminCoponents/AdminNavbar";
import AdminSidebar from "../../components/adminCoponents/AdminSidebar";
import UserList from "../../components/adminCoponents/UserList";

const UserListPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex">
        <AdminSidebar />
        <UserList />
      </div>
    </>
  );
};

export default UserListPage;

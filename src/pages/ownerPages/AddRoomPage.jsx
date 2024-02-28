import React from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerSidebar from "../../components/ownerComponents/dashboard/OwnerSidebar";
import AddRoomForm from "../../components/ownerComponents/dashboard/AddRoomForm";

const AddRoomPage = () => {
  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex -mt-6">
        <OwnerSidebar />
        <AddRoomForm />
      </div>
    </>
  );
};

export default AddRoomPage;

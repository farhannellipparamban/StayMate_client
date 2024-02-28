import React from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerSidebar from "../../components/ownerComponents/dashboard/OwnerSidebar";
import EditRoom from "../../components/ownerComponents/dashboard/EditRoom";

const EditRoomPage = () => {
  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex -mt-6">
        <OwnerSidebar />
        <EditRoom />
      </div>
    </>
  );
};

export default EditRoomPage;

import React from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerProfile from "../../components/ownerComponents/profile/ownerProfile";
import OwnerFooter from "../../components/ownerComponents/ownerCommon/OwnerFooter";

const OwnerProfilePage = () => {
  return (
    <>
      <OwnerNavbar />
      <OwnerProfile/>
      <OwnerFooter />
    </>
  );
};

export default OwnerProfilePage;

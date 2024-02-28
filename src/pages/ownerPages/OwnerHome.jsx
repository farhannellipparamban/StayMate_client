import React from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerCarousel  from "../../components/ownerComponents/Home/OwnerHero";
import OwnerFooter from "../../components/ownerComponents/ownerCommon/OwnerFooter";

const OwnerHome = () => {
  return (
    <>
      <OwnerNavbar />
      <OwnerCarousel />
      <OwnerFooter />
    </>
  );
};

export default OwnerHome;

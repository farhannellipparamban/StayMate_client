import React from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerFooter from "../../components/ownerComponents/ownerCommon/OwnerFooter";
import About from "../../components/common/About/About";

const OwnerAboutPage = () => {
  return (
    <>
      <OwnerNavbar />
      <About />
      <OwnerFooter />
    </>
  );
};

export default OwnerAboutPage;

import React from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import About from "../../components/common/About/About";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";

const UserAboutPage = () => {
  return (
    <>
      <UserNavbar />
      <About />
      <UserFooter />
    </>
  );
};

export default UserAboutPage;
